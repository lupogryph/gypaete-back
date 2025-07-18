import {Injectable} from "@nestjs/common";
import {CreateChaletDto} from "./dto/create-chalet.dto";
import {UpdateChaletDto} from "./dto/update-chalet.dto";
import {PhotoService} from "../photo/photo.service";
import {InjectRepository} from "@nestjs/typeorm";
import {ChaletEntity} from "./entities/chalet.entity";
import {Repository} from "typeorm";

@Injectable()
export class ChaletService {
    constructor(
        @InjectRepository(ChaletEntity)
        private chaletRepository: Repository<ChaletEntity>,
        private readonly photoService: PhotoService
    ) {
    }

    async create(createChaletDto: CreateChaletDto) {
        return this.chaletRepository.save(createChaletDto);
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
        const photoEntity = await this.photoService.uploadToEntity(file);
        return this.chaletRepository.manager
            .createQueryBuilder()
            .relation("photo")
            .of(nom)
            .add(photoEntity);
    }

}
