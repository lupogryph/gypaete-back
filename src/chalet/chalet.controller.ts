import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChaletService } from './chalet.service';
import { CreateChaletDto } from './dto/create-chalet.dto';
import { UpdateChaletDto } from './dto/update-chalet.dto';

@Controller('chalet')
export class ChaletController {
  constructor(private readonly chaletService: ChaletService) {}

  @Post()
  create(@Body() createChaletDto: CreateChaletDto) {
    return this.chaletService.create(createChaletDto);
  }

  @Get()
  findAll() {
    return this.chaletService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chaletService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChaletDto: UpdateChaletDto) {
    return this.chaletService.update(+id, updateChaletDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chaletService.remove(+id);
  }
}
