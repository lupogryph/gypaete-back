import {Injectable, InternalServerErrorException} from "@nestjs/common";
import {PhotoEntity} from "./entities/photo.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Jimp} from "jimp";
import {Repository} from "typeorm";
import {AppConfigService} from "../config/app.config.service";

@Injectable()
export class PhotoService {

    constructor(
        @InjectRepository(PhotoEntity)
        private photoRepository: Repository<PhotoEntity>,
        private readonly config: AppConfigService,
    ) {
    }

    async uploadPhoto(photoEntity: PhotoEntity, file: Buffer): Promise<PhotoEntity> {
        if (!file) {
            throw new InternalServerErrorException('No file provided');
        }
        const filesUrl = `${this.config.baseUrl()}/files`;
        photoEntity.url = `${filesUrl}/photos/${photoEntity.id}.jpg`;
        photoEntity.thumbnailUrl = `${filesUrl}/thumbnails/${photoEntity.id}.jpg`;
        await this.createResizedPhoto(photoEntity.id, file);
        await this.createThumbnail(photoEntity.id, file);
        return this.photoRepository.save(photoEntity);
    }

    async deletePhoto(id: string) {
        return this.photoRepository.delete(id);
    }

    async createResizedPhoto(name: string, file: Buffer) {
        const image = await Jimp.read(file);
        image.resize(image.height >= image.height ? {w: 1024} : {h: 1024});// Resize based on height or width
        return image.write(`./images/photos/${name}.jpg`);
    }

    async createThumbnail(name: string, file: Buffer) {
        const image = await Jimp.read(file);
        image.resize({h: 320}); // Resize to 320px height, auto width
        return image.write(`./images/thumbnails/${name}.jpg`); // Save thumbnail
    }

}
