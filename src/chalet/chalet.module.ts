import {Module} from '@nestjs/common';
import {ChaletService} from './chalet.service';
import {ChaletController} from './chalet.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ChaletEntity} from "./entities/chalet.entity";
import {PhotoService} from "../photo/photo.service";
import {PhotoEntity} from "../photo/entities/photo.entity";
import {ApiConfigService} from "../config/api.config.service";

@Module({
    imports: [TypeOrmModule.forFeature([ChaletEntity, PhotoEntity])],
    controllers: [ChaletController],
    providers: [ChaletService, PhotoService, ApiConfigService],
})
export class ChaletModule {
}
