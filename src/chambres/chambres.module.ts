import {Module} from '@nestjs/common';
import {ChambresService} from './chambres.service';
import {ChambresController} from './chambres.controller';
import {ChambreEntity} from "./entities/chambre.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {LitChambreEntity} from "./entities/lit-chambre.entity";
import {LitEntity} from "./entities/lit.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ChambreEntity, LitEntity, LitChambreEntity])],
    controllers: [ChambresController],
    providers: [ChambresService],
})
export class ChambresModule {
}
