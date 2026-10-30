import {BadRequestException, Injectable} from '@nestjs/common';
import {CreateChambreDto} from './dto/create-chambre.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {ChambreEntity} from "./entities/chambre.entity";
import {DataSource, Repository} from "typeorm";
import {PhotoService} from "../photo/photo.service";
import {CreatePhotoDto} from "../photo/dto/create-photo.dto";
import {PhotoEntity} from "../photo/entities/photo.entity";
import {FindOptionsRelations} from "typeorm/find-options/FindOptionsRelations";
import {LitChambreEntity} from "./entities/lit-chambre.entity";
import {LitChambreDto} from "./dto/lit-chambre.dto";

@Injectable()
export class ChambresService {
    all_relations: FindOptionsRelations<ChambreEntity> = {
        photos: true,
        lits: {lit: true},
        prestationsPayantes: true,
        personnesSupplementaires: true,
        animaux: true,
        plusNuit: true,
        plusPersonne: true
    };

    constructor(
        @InjectRepository(ChambreEntity)
        private repository: Repository<ChambreEntity>,
        @InjectRepository(LitChambreEntity)
        private litsChambresRepository: Repository<LitChambreEntity>,
        private datasource: DataSource,
        private readonly photoService: PhotoService
    ) {
    }

    create(dto: CreateChambreDto) {
        return this.datasource.transaction(async (manager) => {
            const {lits, ...chambreDto} = dto;
            const chambre = await manager.save(manager.create(ChambreEntity, chambreDto));
            if (lits !== undefined) {
                await this.syncLits(manager, chambre.numero, lits);
            }
            return chambre;
        });
    }

    findAll() {
        return this.repository.find({relations: this.all_relations});
    }

    findOne(numero: number) {
        return this.repository.findOne({where: {numero: numero}, relations: this.all_relations});
    }

    update(numero: number, dto: CreateChambreDto) {
        return this.datasource.transaction(async (manager) => {
            const {lits, ...chambreDto} = dto;
            const chambre = await manager.save(
                manager.create(ChambreEntity, {...chambreDto, numero}),
            );
            if (lits !== undefined) {
                await this.syncLits(manager, numero, lits);
            }
            return chambre;
        });
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

    private async syncLits(
        manager: DataSource["manager"],
        chambreNumero: number,
        lits: LitChambreDto[],
    ) {
        const litRepository = manager.getRepository(LitChambreEntity);
        const existingLits = await litRepository.findBy({chambreNumero});
        const desiredLits = new Map<number, LitChambreDto>();

        for (const lit of lits) {
            if (desiredLits.has(lit.litId)) {
                throw new BadRequestException(`Duplicate litId in lits: ${lit.litId}`);
            }
            desiredLits.set(lit.litId, lit);
        }

        const removedLits = existingLits.filter((lit) => !desiredLits.has(lit.litId));
        if (removedLits.length > 0) {
            await litRepository.remove(removedLits);
        }

        const updatedLits = lits.map((lit) =>
            litRepository.create({
                chambreNumero,
                litId: lit.litId,
                nombre: lit.nombre,
            }),
        );
        if (updatedLits.length > 0) {
            await litRepository.save(updatedLits);
        }
    }
}
