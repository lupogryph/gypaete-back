import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseInterceptors,
    Put,
    Request,
    UploadedFile
} from '@nestjs/common';
import {ChaletService} from './chalet.service';
import {CreateChaletDto} from './dto/create-chalet.dto';
import {UpdateChaletDto} from './dto/update-chalet.dto';
import {FileInterceptor} from "@nestjs/platform-express";
import {memoryStorage} from "multer";
import {Express} from "express";
import {PhotoService} from "../photo/photo.service";

@Controller('chalet')
export class ChaletController {
    constructor(
        private readonly chaletService: ChaletService,
        private readonly photoService: PhotoService
    ) {
    }

    @Post()
    create(@Body() createChaletDto: CreateChaletDto) {
        return this.chaletService.create(createChaletDto);
    }

    @Get()
    findAll() {
        return this.chaletService.findAll();
    }

    @Get(':nom')
    findOne(@Param('nom') nom: string) {
        return this.chaletService.findOne(nom);
    }

    @Patch(':nom')
    update(@Param('nom') nom: string, @Body() updateChaletDto: UpdateChaletDto) {
        return this.chaletService.update(nom, updateChaletDto);
    }

    @Delete(':nom')
    remove(@Param('nom') nom: string) {
        return this.chaletService.remove(nom);
    }

    @UseInterceptors(FileInterceptor('file', {storage: memoryStorage()}))
    @Put('/:nom/photo')
    createForChalet(
        @Request() req,
        @Param('nom') nom: string,
        @UploadedFile() file: Express.Multer.File
    ) {
        return this.chaletService.uploadPhoto(nom, file.buffer);
    }
}
