import { Injectable } from '@nestjs/common';
import { CreateSocialDto } from './dto/create-social.dto';
import { UpdateSocialDto } from './dto/update-social.dto';
import {SocialEntity} from "./entities/social.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class SocialService {
  constructor(
      @InjectRepository(SocialEntity)
      private repository: Repository<SocialEntity>
  ) {
  }

  create(createSocialDto: CreateSocialDto) {
    const social = this.repository.create(createSocialDto);
    return this.repository.save(social);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOneBy({id: id});
  }

  update(id: number, updateSocialDto: UpdateSocialDto) {
    const social = this.repository.create(updateSocialDto);
    return this.repository.update(id, social);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
