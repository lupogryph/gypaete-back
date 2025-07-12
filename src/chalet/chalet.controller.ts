import {Body, Controller, Delete, Get, Param, Patch, Post, Put, UploadedFile, UseInterceptors} from "@nestjs/common";
import {ChaletService} from "./chalet.service";
import {CreateChaletDto} from "./dto/create-chalet.dto";
import {UpdateChaletDto} from "./dto/update-chalet.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {memoryStorage} from "multer";
import {Express} from "express";
import {Public} from "../auth/public.decorator";
import {ApiBearerAuth, ApiBody, ApiConsumes} from "@nestjs/swagger";
import {UploadDto} from "../photo/dto/upload.dto";

@Controller('chalet')
export class ChaletController {
    constructor(
        private readonly chaletService: ChaletService,
    ) {
    }

    @ApiBearerAuth()
    @Post()
    create(@Body() createChaletDto: CreateChaletDto) {
        return this.chaletService.create(createChaletDto);
    }

    @Get()
    @Public()
    findAll() {
        return this.chaletService.findAll();
    }

    @Get(':nom')
    @Public()
    findOne(@Param('nom') nom: string) {
        return this.chaletService.findOne(nom);
    }

    @ApiBearerAuth()
    @Patch(':nom')
    update(@Param('nom') nom: string, @Body() updateChaletDto: UpdateChaletDto) {
        return this.chaletService.update(nom, updateChaletDto);
    }

    @ApiBearerAuth()
    @Delete(':nom')
    remove(@Param('nom') nom: string) {
        return this.chaletService.remove(nom);
    }

    @ApiBearerAuth()
    @ApiConsumes("multipart/form-data")
    @ApiBody({description: "photo", type: UploadDto})
    @UseInterceptors(FileInterceptor('file', {storage: memoryStorage()}))
    @Put('/:nom/photo')
    createForChalet(
        @Param('nom') nom: string,
        @UploadedFile() file: Express.Multer.File
    ) {
        return this.chaletService.uploadPhoto(nom, file.buffer);
    }
}
