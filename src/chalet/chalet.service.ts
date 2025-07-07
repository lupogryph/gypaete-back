import {Injectable} from '@nestjs/common';
import {CreateChaletDto} from './dto/create-chalet.dto';
import {UpdateChaletDto} from './dto/update-chalet.dto';
import {PhotoService} from "../photo/photo.service";
import {InjectRepository} from "@nestjs/typeorm";
import {ChaletEntity} from "./entities/chalet.entity";
import {Repository} from "typeorm";
import {PhotoEntity} from "../photo/entities/photo.entity";

@Injectable()
export class ChaletService {
    constructor(
        @InjectRepository(ChaletEntity)
        private chaletRepository: Repository<ChaletEntity>,
        private readonly photoService: PhotoService
    ) {
    }

    create(createChaletDto: CreateChaletDto) {
        return this.chaletRepository.create(createChaletDto);
    }

    findAll() {
        return this.chaletRepository.find();
    }

    findOne(nom: string) {
        return this.chaletRepository.findOneBy({nom: nom});
    }

    update(nom: string, updateChaletDto: UpdateChaletDto) {
        return this.chaletRepository.update(nom, updateChaletDto);
    }

    remove(nom: string) {
        return this.chaletRepository.delete(nom);
    }

    async uploadPhoto(nom: string, file: Buffer) {
        const chalet = await this.chaletRepository.findOneBy({nom: nom});
        if (!chalet) {
            throw new Error(`Chalet with name ${nom} not found`);
        }
        const photo = new PhotoEntity();
        photo.chalet = chalet;
        return this.photoService.uploadPhoto(photo, file);
    }
}
