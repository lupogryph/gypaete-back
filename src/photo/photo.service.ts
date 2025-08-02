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
import {v4 as uuidv4} from 'uuid';

@Injectable()
export class PhotoService {
    photosPath = 'files/images/photos';
    thumbnailsPath = 'files/images/thumbnails';

    constructor(
        @InjectRepository(PhotoEntity)
        private photoRepository: Repository<PhotoEntity>,
        @Inject(appConfig.KEY)
        private readonly config: ConfigType<typeof appConfig>,
    ) {
    }

    addToEntity(photo: CreatePhotoDto) {
        return this.photoRepository.create({id: uuidv4(), ...photo});
    }

    async uploadToEntity(file: Buffer) {
        if (!file) {
            throw new InternalServerErrorException('No file provided');
        }
        const photoEntity = this.photoRepository.create({id: uuidv4()});
        console.log("photoEntity", JSON.stringify(photoEntity, null, 2));
        const photo = await this.createResizedPhoto(photoEntity.id, file);
        const thumb = await this.createThumbnail(photoEntity.id, file);
        photoEntity.size = photo.size + thumb.size;
        if (!(await this.canUploadPhoto(photoEntity.size))) {
            throw new HttpException('Not enough space to upload photo', 507); // Insufficient Storage
        }
        photoEntity.url = `${this.baseUrl()}/${photo.path}`;
        photoEntity.thumbnailUrl = `${this.baseUrl()}/${thumb.path}`;
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
        const filePath = path.join(__dirname, '..', this.photosPath, `${id}.jpg`);
        return this.deleteIfExists(filePath);
    }

    async deleteThumbnailFs(id: string) {
        const filePath = path.join(__dirname, '..', this.thumbnailsPath, `${id}.jpg`);
        return this.deleteIfExists(filePath);
    }

    async deleteIfExists(filePath: string) {
        return fs.stat(filePath).then(s => fs.unlink(filePath));
    }

    async createResizedPhoto(name: string, file: Buffer) {
        const path = `${this.photosPath}/${name}.jpg`
        const image = await Jimp.read(file);
        if (image.height > 1024 || image.width > 1024) {
            image.resize(image.height >= image.height ? {w: 1024} : {h: 1024}); // Resize based on height or width
        }
        const size = await this.getImageSizeInKB(image);
        const save = image.write(`${this.photosPath}/${name}.jpg`);
        return {path: path, size: size};
    }

    async createThumbnail(name: string, file: Buffer) {
        const path = `${this.thumbnailsPath}/${name}.jpg`
        const image = await Jimp.read(file);
        if (image.height > 320) {
            image.resize({h: 320}); // Resize to 320px height, auto width
        }
        const size = await this.getImageSizeInKB(image);
        const save = image.write(`${this.thumbnailsPath}/${name}.jpg`);
        return {path: path, size: size};
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
