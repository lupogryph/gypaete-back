import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { PhotoEntity } from './entities/photo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DropboxModule } from '../dropbox/dropbox.module';

@Module({
  imports: [TypeOrmModule.forFeature([PhotoEntity]), DropboxModule],
  controllers: [PhotoController],
  providers: [PhotoService],
})
export class PhotoModule {}
