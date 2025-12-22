import {Injectable} from '@nestjs/common';
import {CreateChambreDto} from './dto/create-chambre.dto';
import {UpdateChambreDto} from './dto/update-chambre.dto';
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
        animaux: true
    };

    constructor(
        @InjectRepository(ChambreEntity)
        private repository: Repository<ChambreEntity>,
        private datasource: DataSource,
        private readonly photoService: PhotoService
    ) {
    }

    create(createChambreDto: CreateChambreDto) {
        const chambre = this.repository.create(createChambreDto);
        return this.repository.save(chambre);
    }

    findAll() {
        return this.repository.createQueryBuilder()
            .leftJoinAndSelect(q =>
                    q.from(PhotoEntity, "photo")
                        .orderBy("photo.order", "ASC").limit(1),
                "photos",
                "photos.chambreId = chambre.id")
            .getMany();
    }

    findOne(numero: number) {
        return this.repository.findOne({where: {numero: numero}, relations: this.all_relations});
    }

    update(numero: number, updateChambreDto: UpdateChambreDto) {
        const chambre = this.repository.create(updateChambreDto);
        return this.repository.update(numero, chambre);
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

    // todo : maybe do this in transaction ?
    async deletePhotos(numero: number) {
        return this.repository.findOne({
            where: {numero: numero},
            select: {photos: true},
            relations: {photos: true}
        })
            .then(c => Promise.all(
                c.photos.map(photo => this.photoService.deletePhoto(photo.id))
            ));
    }
}
