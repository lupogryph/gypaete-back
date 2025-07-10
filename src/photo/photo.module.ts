import {Module} from "@nestjs/common";
import {PhotoService} from "./photo.service";
import {PhotoController} from "./photo.controller";
import {PhotoEntity} from "./entities/photo.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AppConfigModule} from "../config/app.config.module";

@Module({
    imports: [AppConfigModule, TypeOrmModule.forFeature([PhotoEntity])],
    controllers: [PhotoController],
    providers: [PhotoService],
    exports: [PhotoService, TypeOrmModule],
})
export class PhotoModule {
}
