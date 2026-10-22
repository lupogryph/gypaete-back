import {Module} from "@nestjs/common";
import {ChaletService} from "./chalet.service";
import {ChaletController} from "./chalet.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ChaletEntity} from "./entities/chalet.entity";
import {PhotoModule} from "../photo/photo.module";
import {FirstChaletSeedService} from "./first-chalet-seed.service";

@Module({
    imports: [PhotoModule, TypeOrmModule.forFeature([ChaletEntity])],
    controllers: [ChaletController],
    providers: [ChaletService, TypeOrmModule, FirstChaletSeedService],
})
export class ChaletModule {
}
