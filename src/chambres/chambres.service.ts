import {Injectable} from '@nestjs/common';
import {CreateChambreDto} from './dto/create-chambre.dto';
import {UpdateChambreDto} from './dto/update-chambre.dto';
import * as Buffer from "node:buffer";
import {InjectRepository} from "@nestjs/typeorm";
import {ChambreEntity} from "./entities/chambre.entity";
import {Repository} from "typeorm";
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
        private chambreRepository: Repository<ChambreEntity>,
        private readonly photoService: PhotoService
    ) {
    }

    create(createChambreDto: CreateChambreDto) {
        return this.chambreRepository.create(createChambreDto);
    }

    findAll() {
        return this.chambreRepository.find({relations: this.all_relations});
    }

    findOne(numero: number) {
        return this.chambreRepository.findOne({where: {numero: numero}, relations: this.all_relations});
    }

    update(id: number, updateChambreDto: UpdateChambreDto) {
        return `This action updates a #${id} chambre`;
    }

    remove(id: number) {
        return `This action removes a #${id} chambre`;
    }

    async uploadPhoto(id: number, file: Buffer) {
        const photoEntity = await this.photoService.uploadToEntity(file);
        return this.savePhoto(id, photoEntity);
    }

    addPhoto(id: number, photo: CreatePhotoDto) {
        const photoEntity = this.photoService.addToEntity(photo);
        return this.savePhoto(id, photoEntity);
    }

    savePhoto(id: number, photo: PhotoEntity) {
        return this.chambreRepository.manager
            .createQueryBuilder()
            .relation("photo")
            .of(id)
            .add(photo);
    }
}
