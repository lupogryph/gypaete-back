import {Module} from "@nestjs/common";
import {PhotoService} from "./photo.service";
import {PhotoController} from "./photo.controller";
import {PhotoEntity} from "./entities/photo.entity";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([PhotoEntity])],
    controllers: [PhotoController],
    providers: [PhotoService],
    exports: [PhotoService, TypeOrmModule],
})
export class PhotoModule {
}
