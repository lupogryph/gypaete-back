import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateInfoDto } from "./dto/create-info.dto";
import { UpdateInfoDto } from "./dto/update-info.dto";
import { Info } from "./entities/info.entity";
import {INFOS_SINGLE_ID} from "./infos.constants";

@Injectable()
export class InfosService {
  constructor(
    @InjectRepository(Info)
    private readonly infosRepository: Repository<Info>,
  ) {}

  create(createInfoDto: CreateInfoDto) {
    const info = this.infosRepository.create({
      ...createInfoDto,
      id: INFOS_SINGLE_ID,
    });
    return this.infosRepository.save(info);
  }

  findAll() {
    return this.infosRepository.find({ where: { id: INFOS_SINGLE_ID } });
  }

  async findOne(id: number) {
    if (id !== INFOS_SINGLE_ID) {
      throw new NotFoundException(`Info ${id} not found`);
    }
    const info = await this.infosRepository.findOneBy({
      id: INFOS_SINGLE_ID,
    });
    if (!info) {
      throw new NotFoundException(`Info ${id} not found`);
    }
    return info;
  }

  async update(id: number, updateInfoDto: UpdateInfoDto) {
    const currentInfo = await this.findOne(id);
    if (!updateInfoDto || Object.keys(updateInfoDto).length === 0) {
      throw new BadRequestException("At least one info field must be provided");
    }
    return this.infosRepository.save({ ...currentInfo, ...updateInfoDto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.infosRepository.delete(INFOS_SINGLE_ID);
  }
}
