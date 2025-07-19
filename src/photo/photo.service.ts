import {HttpException, Inject, Injectable, InternalServerErrorException, NotFoundException} from "@nestjs/common";
import {PhotoEntity} from "./entities/photo.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Jimp} from "jimp";
import {Repository} from "typeorm";
import appConfig from "../config/app.config";
import {ConfigType} from "@nestjs/config";
import * as path from "node:path";
import {promises as fs} from "node:fs";
import {CreatePhotoDto} from "./dto/create-photo.dto";
import {SpaceDto} from "./dto/space.dto";

@Injectable()
export class PhotoService {

    constructor(
        @InjectRepository(PhotoEntity)
        private photoRepository: Repository<PhotoEntity>,
        @Inject(appConfig.KEY)
        private readonly config: ConfigType<typeof appConfig>,
    ) {
    }

    addToEntity(photo: CreatePhotoDto) {
        const photoEntity = new PhotoEntity();
        photoEntity.url = photo.url;
        photoEntity.thumbnailUrl = photo.thumbnailUrl;
        return photoEntity;
    }

    async uploadToEntity(file: Buffer): Promise<PhotoEntity> {
        if (!file) {
            throw new InternalServerErrorException('No file provided');
        }
        const photoEntity = new PhotoEntity();
        const filesUrl = `${this.baseUrl()}/files`;
        const photo = await this.createResizedPhoto(photoEntity.id, file);
        const thumb = await this.createThumbnail(photoEntity.id, file);
        photoEntity.size = photo.size + thumb.size;
        if (!(await this.canUploadPhoto(photoEntity.size))) {
            throw new HttpException('Not enough space to upload photo', 507); // Insufficient Storage
        }
        photo.save.then();
        photoEntity.url = `${filesUrl}${photo.path}`;
        thumb.save.then();
        photoEntity.thumbnailUrl = `${filesUrl}${thumb.path}`;
        return photoEntity;
    }

    async deletePhoto(id: string) {
        const photoEntity = await this.photoRepository.findOneBy({id: id});
        if (!photoEntity) {
            throw new NotFoundException(`Photo ${id} not found`);
        }
        try {
            await this.deletePhotoFs(photoEntity.id);
            await this.deleteThumbnailFs(photoEntity.id);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
        return this.photoRepository.delete(id);
    }

    async deletePhotoFs(id: string) {
        const filePath = path.join(__dirname, './files/images/photos', `${id}.jpg`);
        return this.deleteIfExists(filePath);
    }

    async deleteThumbnailFs(id: string) {
        const filePath = path.join(__dirname, './files/images/thumbnails', `${id}.jpg`);
        return this.deleteIfExists(filePath);
    }

    async deleteIfExists(filePath: string) {
        return fs.stat(filePath).then(s => fs.unlink(filePath));
    }

    async createResizedPhoto(name: string, file: Buffer) {
        const path = `/images/photos/${name}.jpg`
        const image = await Jimp.read(file);
        image.resize(image.height >= image.height ? {w: 1024} : {h: 1024});// Resize based on height or width
        const size = await this.getImageSizeInKB(image);
        const save = image.write(`.${path}`);
        return {path: path, size: size, save: save};
    }

    async createThumbnail(name: string, file: Buffer) {
        const path = `/images/thumbnails/${name}.jpg`
        const image = await Jimp.read(file);
        image.resize({h: 320}); // Resize to 320px height, auto width
        const size = await this.getImageSizeInKB(image);
        const save = image.write(`.${path}`);
        return {path: path, size: size, save: save};
    }

    baseUrl(): string {
        const protocol = this.config.https ? 'https' : 'http';
        return `${protocol}://${this.config.host}:${this.config.port}`;
    }

    async getImageSizeInKB(image: any) {
        const buffer = await image.getBuffer("image/jpeg");
        return buffer.length / 1024;
    }

    async usedSpace() {
        return this.photoRepository.sum('size');
    }

    async space() {
        const space = new SpaceDto();
        space.total = this.config.photos_space;
        space.used = await this.usedSpace();
        space.left = space.total - space.used;
        return space;
    }

    async canUploadPhoto(size: number) {
        const space = await this.space();
        return size <= space.left;
    }

}
