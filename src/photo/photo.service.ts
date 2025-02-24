import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Categorie, PhotoEntity } from './entities/photo.entity';
import { Repository } from 'typeorm';
import { InviteService } from '../invite/invite.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DropboxService } from '../dropbox/dropbox.service';
import Jimp from "jimp";

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(PhotoEntity)
    private photoRepository: Repository<PhotoEntity>,
    private inviteService: InviteService,
    private dropbox: DropboxService
  ) {}

  async create(id: number, categorie: Categorie, file: Buffer, ext: string) {
    const photo = new PhotoEntity();
    photo.categorie = categorie;
    photo.invite = await this.inviteService.findById(id);
    photo.dbxpath = '/' + categorie + '/' + categorie.toString() + '_' + photo.invite.id + '_' + photo.invite.pseudo + ext;
    return Jimp.read(file)
      .then((image) => {
        if (image.getHeight() >= image.getWidth()) {
          image.resize(Jimp.AUTO, 1024);  
        }
        else {
          image.resize(1024, Jimp.AUTO);  
        }
        return image.getBufferAsync(Jimp.MIME_JPEG)
          .then((resized) => this.dropbox.upload(photo.dbxpath, resized))
          .then((url) => {
            photo.url = url;
            console.log(photo);
            return this.photoRepository.save(photo)
              .then(photo => photo.url)
              .catch(error => {throw new InternalServerErrorException('db error: ' + error, error)});
          })
      })      
      .catch((error) => {throw new InternalServerErrorException('dbx error: ' + error, error)});
  }

  async findByInvite(id: number) {
    const invite = await this.inviteService.findById(id);
    return this.photoRepository.findBy({invite: invite});
  }

  async remove(id: number, categorie: Categorie) {
    const invite = await this.inviteService.findById(id);
    const photo = await this.photoRepository.findOneBy({invite: invite, categorie: categorie});
    await this.dropbox.delete(photo.dbxpath);
    return this.photoRepository.delete(photo);
  }
}
