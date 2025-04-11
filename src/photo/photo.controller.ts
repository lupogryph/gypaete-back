import { Controller, Param, Request, Put, UploadedFile, UseInterceptors, Get, Delete } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { Express } from 'express';
import { FileService } from '../dropbox/file.service';
import { Categorie } from './entities/photo.entity';

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService, private fileService: FileService) { }

  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  @Put(':categorie')
  create(
    @Request() req,
    @Param('categorie') categorie: Categorie,
    @UploadedFile() file?: Express.Multer.File
  ) {
    const ext = this.fileService.getExt(file.originalname);
    return this.photoService.create(req.user.sub, categorie, file.buffer, ext);
  }

  @Get()
  getPhotos(@Request() req) {
    return this.photoService.findByInvite(req.user.sub);
  }

  @Delete(':categorie')
  deletePhoto(@Request() req, @Param('categorie') categorie: Categorie) {
    return this.photoService.remove(req.user.sub, categorie);
  }

}
