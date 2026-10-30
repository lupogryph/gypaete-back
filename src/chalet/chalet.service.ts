import {Injectable, Logger} from "@nestjs/common";
import {CreateChaletDto} from "./dto/create-chalet.dto";
import {PhotoService} from "../photo/photo.service";
import {InjectRepository} from "@nestjs/typeorm";
import {ChaletEntity} from "./entities/chalet.entity";
import {DataSource, Repository} from "typeorm";
import {FindOptionsRelations} from "typeorm/find-options/FindOptionsRelations";
import {CreatePhotoDto} from "../photo/dto/create-photo.dto";
import {PhotoEntity} from "../photo/entities/photo.entity";
import {CHALET_SINGLE_ID} from "./chalet.constants";

@Injectable()
export class ChaletService {
    private readonly logger = new Logger(ChaletService.name);

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

    create(dto: CreateChaletDto) {
        const chalet = this.chaletRepository.create(dto);
        chalet.id = CHALET_SINGLE_ID;
        return this.chaletRepository.save(chalet);
    }

    findOne(id: number) {
        return this.chaletRepository.findOne({where: {id: id}, relations: this.all_relations});
    }

    update(id: number, dto: CreateChaletDto) {
        const chalet = this.chaletRepository.create({...dto, id});
        return this.chaletRepository.save(chalet);
    }

    async remove(id: number) {
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
        }).catch(error => {
            this.logger.error(error);
            this.photoService.deletePhoto(photo.id);
        });
    }

    async deletePhoto(photoId: string) {
        return this.datasource.transaction(async manager => {
            await this.photoService.deletePhoto(photoId);
            await manager.createQueryBuilder()
                .relation(ChaletEntity, "photos")
                .of(CHALET_SINGLE_ID)
                .remove(photoId);
        });
    }

}
