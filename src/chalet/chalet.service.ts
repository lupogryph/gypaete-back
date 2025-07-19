import {Injectable} from "@nestjs/common";
import {CreateChaletDto} from "./dto/create-chalet.dto";
import {UpdateChaletDto} from "./dto/update-chalet.dto";
import {PhotoService} from "../photo/photo.service";
import {InjectRepository} from "@nestjs/typeorm";
import {ChaletEntity} from "./entities/chalet.entity";
import {Repository} from "typeorm";
import {FindOptionsRelations} from "typeorm/find-options/FindOptionsRelations";

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

    update(updateChaletDto: UpdateChaletDto) {
        const chalet = this.chaletRepository.create(updateChaletDto);
        console.log(JSON.stringify(chalet, null, 2));
        return this.chaletRepository.save(chalet);
    }

    async remove(id: number) {
        await this.deletePhotos(id);
        return this.chaletRepository.delete(id);
    }

    async uploadPhoto(id: number, file: Buffer) {
        const photoEntity = await this.photoService.uploadToEntity(file);
        return this.chaletRepository.manager
            .createQueryBuilder()
            .relation("photo")
            .of(id)
            .add(photoEntity);
    }

    async deletePhotos(id: number) {
        return this.chaletRepository.findOne({where: {id: id}, select: {photos: true}, relations: {photos: true}})
            .then(chalet => Promise.all(
                chalet.photos.map(photo => this.photoService.deletePhoto(photo.id))
            ));
    }

}
