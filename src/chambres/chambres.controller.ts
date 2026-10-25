import {Body, Controller, Delete, Get, Param, Patch, Post, Put, UploadedFile, UseInterceptors} from '@nestjs/common';
import {ChambresService} from './chambres.service';
import {CreateChambreDto} from './dto/create-chambre.dto';
import {ApiBearerAuth, ApiBody, ApiConsumes, ApiCreatedResponse, ApiOkResponse} from "@nestjs/swagger";
import {UploadDto} from "../photo/dto/upload.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {memoryStorage} from "multer";
import {Express} from "express";
import {CreatePhotoDto} from "../photo/dto/create-photo.dto";
import {Public} from "../auth/public.decorator";
import {ChambreDto} from "./dto/chambre.dto";
import {AddLitDto} from "./dto/add-lit.dto";

@Controller('chambres')
export class ChambresController {
    constructor(private readonly chambresService: ChambresService) {
    }

    @ApiBearerAuth()
    @ApiOkResponse({type: ChambreDto})
    @Post()
    create(@Body() dto: CreateChambreDto) {
        return this.chambresService.create(dto);
    }

    @Public()
    @ApiOkResponse({type: ChambreDto, isArray: true})
    @Get()
    findAll() {
        return this.chambresService.findAll();
    }

    @Public()
    @ApiOkResponse({type: ChambreDto})
    @Get(':numero')
    findOne(@Param('numero') numero: number) {
        return this.chambresService.findOne(+numero);
    }

    @ApiBearerAuth()
    @ApiCreatedResponse({type: ChambreDto})
    @Patch(':numero')
    update(@Param('numero') numero: number, @Body() dto: CreateChambreDto) {
        return this.chambresService.update(+numero, dto);
    }

    @ApiBearerAuth()
    @Delete(':numero')
    remove(@Param('numero') numero: number) {
        return this.chambresService.remove(+numero);
    }

    @ApiBearerAuth()
    @ApiConsumes("multipart/form-data")
    @ApiBody({description: "photo", type: UploadDto})
    @UseInterceptors(FileInterceptor('file', {storage: memoryStorage()}))
    @Put('/:numero/photo')
    uploadPhoto(
        @Param('numero') numero: number,
        @UploadedFile() file: Express.Multer.File
    ) {
        return this.chambresService.uploadPhoto(numero, file.buffer);
    }

    @ApiBearerAuth()
    @Post('/:numero/photo')
    addPhoto(@Param('numero') numero: number, @Body() photo: CreatePhotoDto) {
        return this.chambresService.addPhoto(numero, photo);
    }

    @ApiBearerAuth()
    @Delete('/:numero/photo/:photoId')
    deletePhoto(@Param('numero') numero: number, @Param('photoId') photoId: string) {
        return this.chambresService.deletePhoto(numero, photoId);
    }

    @ApiBearerAuth()
    @Put('/:numero/lit/:litId')
    addLit(
        @Param('numero') numero: number,
        @Param('litId') litId: number,
        @Body() addLitDto: AddLitDto
    ) {
        return this.chambresService.addLit(+numero, +litId, addLitDto?.nombre ?? 1);
    }

    @ApiBearerAuth()
    @Delete('/:numero/lit/:litId')
    removeLit(@Param('numero') numero: number, @Param('litId') litId: number) {
        return this.chambresService.deleteLit(+numero, +litId);
    }
}
