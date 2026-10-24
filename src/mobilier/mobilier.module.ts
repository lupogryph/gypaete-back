import {Module} from '@nestjs/common';
import {LitService} from './lit/lit.service';
import {LitController} from './lit/litController';
import {TypeOrmModule} from "@nestjs/typeorm";
import {LitEntity} from "./lit/entities/lit.entity";

@Module({
    imports: [TypeOrmModule.forFeature([LitEntity])],
    controllers: [LitController],
    providers: [LitService],
})
export class MobilierModule {
}
