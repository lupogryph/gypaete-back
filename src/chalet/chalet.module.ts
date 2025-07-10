import {Module} from "@nestjs/common";
import {ChaletService} from "./chalet.service";
import {ChaletController} from "./chalet.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ChaletEntity} from "./entities/chalet.entity";
import {PhotoModule} from "../photo/photo.module";

@Module({
    imports: [PhotoModule, TypeOrmModule.forFeature([ChaletEntity])],
    controllers: [ChaletController],
    providers: [ChaletService, TypeOrmModule],
})
export class ChaletModule {
}
