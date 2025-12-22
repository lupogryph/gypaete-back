import {Injectable} from "@nestjs/common";
import {CreateChaletDto} from "./dto/create-chalet.dto";
import {UpdateChaletDto} from "./dto/update-chalet.dto";
import {PhotoService} from "../photo/photo.service";
import {InjectRepository} from "@nestjs/typeorm";
import {ChaletEntity} from "./entities/chalet.entity";
import {DataSource, Repository} from "typeorm";
import {FindOptionsRelations} from "typeorm/find-options/FindOptionsRelations";
import {CreatePhotoDto} from "../photo/dto/create-photo.dto";
import {PhotoEntity} from "../photo/entities/photo.entity";

@Injectable()
export class ChaletService {
    all_relations: FindOptionsRelations<ChaletEntity> = {
        photos: true,
        animaux: true,
        prestationsPayantes: true,
        periodes: true
    }

    constructor(
        @InjectRepository(ChaletEntity)
        private chaletRepository: Repository<ChaletEntity>,
        private datasource: DataSource,
        private readonly photoService: PhotoService
    ) {
    }

    create(createChaletDto: CreateChaletDto) {
        const chalet = this.chaletRepository.create(createChaletDto);
        chalet.id = 1;
        return this.chaletRepository.save(chalet);
    }

    findOne(id: number) {
        return this.chaletRepository.findOne({where: {id: id}, relations: this.all_relations});
    }

    update(id: number, updateChaletDto: UpdateChaletDto) {
        const chalet = this.chaletRepository.create(updateChaletDto);
        return this.chaletRepository.update(id, chalet);
    }

    async remove(id: number) {
        await this.deletePhotos(id);
        return this.chaletRepository.delete(id);
    }

    async uploadPhoto(id: number, file: Buffer) {
        const photo = await this.photoService.uploadToEntity(file);
        return this.savePhoto(id, photo);
    }

    addPhoto(id: number, photo: CreatePhotoDto) {
        const photoEntity = this.photoService.addToEntity(photo);
        return this.savePhoto(id, photoEntity);
    }

    async savePhoto(id: number, photo: PhotoEntity) {
        return this.datasource.transaction(async (manager) => {
            const savedPhoto = await manager.save(photo);
            await manager.createQueryBuilder()
                .relation(ChaletEntity, "photos")
                .of(id)
                .add(savedPhoto.id);
        }).catch(error => this.photoService.deletePhoto(photo.id));
    }

    // todo: maybe do this in transaction ?
    async deletePhotos(id: number) {
        return this.chaletRepository.findOne({
            where: {id: id},
            select: {photos: true},
            relations: {photos: true}
        })
            .then(c => Promise.all(
                c.photos.map(photo => this.photoService.deletePhoto(photo.id))
            ));
    }

}
