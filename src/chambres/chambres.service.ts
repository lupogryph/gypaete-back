import {Injectable} from '@nestjs/common';
import {CreateChambreDto} from './dto/create-chambre.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {ChambreEntity} from "./entities/chambre.entity";
import {DataSource, Repository} from "typeorm";
import {PhotoService} from "../photo/photo.service";
import {CreatePhotoDto} from "../photo/dto/create-photo.dto";
import {PhotoEntity} from "../photo/entities/photo.entity";
import {FindOptionsRelations} from "typeorm/find-options/FindOptionsRelations";

@Injectable()
export class ChambresService {
    all_relations: FindOptionsRelations<ChambreEntity> = {
        photos: true,
        lits: true,
        prestationsPayantes: true,
        personnesSupplementaires: true,
        animaux: true,
        plusNuit: true,
        plusPersonne: true
    };

    constructor(
        @InjectRepository(ChambreEntity)
        private repository: Repository<ChambreEntity>,
        private datasource: DataSource,
        private readonly photoService: PhotoService
    ) {
    }

    create(dto: CreateChambreDto) {
        const chambre = this.repository.create(dto);
        return this.repository.save(chambre);
    }

    findAll() {
        return this.repository.find({relations: this.all_relations});
    }

    findOne(numero: number) {
        return this.repository.findOne({where: {numero: numero}, relations: this.all_relations});
    }

    update(numero: number, dto: CreateChambreDto) {
        const chambre = this.repository.create({...dto, numero});
        return this.repository.save(chambre);
    }

    remove(numero: number) {
        return this.repository.delete(numero);
    }

    async uploadPhoto(numero: number, file: Buffer) {
        const photo = await this.photoService.uploadToEntity(file);
        return this.savePhoto(numero, photo);
    }

    addPhoto(numero: number, photo: CreatePhotoDto) {
        const photoEntity = this.photoService.addToEntity(photo);
        return this.savePhoto(numero, photoEntity);
    }

    async savePhoto(numero: number, photo: PhotoEntity) {
        try {
            return await this.datasource.transaction(async (manager) => {
                const savedPhoto = await manager.save(photo);
                await manager.createQueryBuilder()
                    .relation(ChambreEntity, "photos")
                    .of(numero)
                    .add(savedPhoto.id);
            });
        } catch (error) {
            return await this.photoService.deletePhoto(photo.id);
        }
    }

    async deletePhoto(numero: number, photoId: string) {
        return this.datasource.transaction(async manager => {
            await this.photoService.deletePhoto(photoId);
            await manager.createQueryBuilder()
                .relation(ChambreEntity, "photos")
                .of(numero)
                .remove(photoId);
        });
    }

    async addLit(numero: number, litId: number) {
        return this.datasource.createQueryBuilder()
            .relation(ChambreEntity, "lits")
            .of(numero)
            .add(litId);
    }

    async deleteLit(numero: number, litId: number) {
        return this.datasource.createQueryBuilder()
            .relation(ChambreEntity, "lits")
            .of(numero)
            .remove(litId);
    }
}
