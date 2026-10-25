import {Module} from '@nestjs/common';
import {ChambresService} from './chambres.service';
import {ChambresController} from './chambres.controller';
import {ChambreEntity} from "./entities/chambre.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {LitEntity} from "../mobilier/lit/entities/lit.entity";
import {PhotoModule} from "../photo/photo.module";

@Module({
    imports: [PhotoModule, TypeOrmModule.forFeature([ChambreEntity, LitEntity])],
    controllers: [ChambresController],
    providers: [ChambresService],
})
export class ChambresModule {
}
