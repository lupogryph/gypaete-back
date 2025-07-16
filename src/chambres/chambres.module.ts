import {Module} from '@nestjs/common';
import {ChambresService} from './chambres.service';
import {ChambresController} from './chambres.controller';
import {ChambreEntity} from "./entities/chambre.entity";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([ChambreEntity])],
    controllers: [ChambresController],
    providers: [ChambresService],
})
export class ChambresModule {
}
