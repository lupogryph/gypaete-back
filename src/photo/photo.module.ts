import {Module} from '@nestjs/common';
import {PhotoService} from './photo.service';
import {PhotoController} from './photo.controller';
import {PhotoEntity} from './entities/photo.entity';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ApiConfigService} from "../config/api.config.service";

@Module({
    imports: [TypeOrmModule.forFeature([PhotoEntity])],
    controllers: [PhotoController],
    providers: [PhotoService, ApiConfigService],
})
export class PhotoModule {
}
