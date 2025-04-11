import { Injectable } from '@nestjs/common';
import { CreateChaletDto } from './dto/create-chalet.dto';
import { UpdateChaletDto } from './dto/update-chalet.dto';

@Injectable()
export class ChaletService {
  create(createChaletDto: CreateChaletDto) {
    return 'This action adds a new chalet';
  }

  findAll() {
    return `This action returns all chalet`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chalet`;
  }

  update(id: number, updateChaletDto: UpdateChaletDto) {
    return `This action updates a #${id} chalet`;
  }

  remove(id: number) {
    return `This action removes a #${id} chalet`;
  }
}
