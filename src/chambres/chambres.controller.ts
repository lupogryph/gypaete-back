import {Body, Controller, Delete, Get, Param, Patch, Post, Put, UploadedFile, UseInterceptors} from '@nestjs/common';
import {ChambresService} from './chambres.service';
import {CreateChambreDto} from './dto/create-chambre.dto';
import {UpdateChambreDto} from './dto/update-chambre.dto';
import {ApiBearerAuth, ApiBody, ApiConsumes, ApiCreatedResponse, ApiOkResponse} from "@nestjs/swagger";
import {UploadDto} from "../photo/dto/upload.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {memoryStorage} from "multer";
import {Express} from "express";
import {CreatePhotoDto} from "../photo/dto/create-photo.dto";
import {Public} from "../auth/public.decorator";
import {ChambreDto} from "./dto/chambre.dto";

@Controller('chambres')
export class ChambresController {
    constructor(private readonly chambresService: ChambresService) {
    }

    @ApiBearerAuth()
    @ApiOkResponse({type: ChambreDto})
    @Post()
    create(@Body() createChambreDto: CreateChambreDto) {
        return this.chambresService.create(createChambreDto);
    }

    @Public()
    @ApiOkResponse({type: ChambreDto, isArray: true})
    @Get()
    findAll() {
        return this.chambresService.findAll();
    }

    @Public()
    @ApiOkResponse({type: ChambreDto})
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.chambresService.findOne(+id);
    }

    @ApiBearerAuth()
    @ApiCreatedResponse({type: ChambreDto})
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateChambreDto: UpdateChambreDto) {
        return this.chambresService.update(+id, updateChambreDto);
    }

    @ApiBearerAuth()
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.chambresService.remove(+id);
    }

    @ApiBearerAuth()
    @ApiConsumes("multipart/form-data")
    @ApiBody({description: "photo", type: UploadDto})
    @UseInterceptors(FileInterceptor('file', {storage: memoryStorage()}))
    @Put('/:id/photo')
    uploadPhoto(
        @Param('id') id: number,
        @UploadedFile() file: Express.Multer.File
    ) {
        return this.chambresService.uploadPhoto(id, file.buffer);
    }

    @ApiBearerAuth()
    @Post('/:id/photo')
    addPhoto(@Param('id') id: number, @Body() photo: CreatePhotoDto) {
        return this.chambresService.addPhoto(id, photo);
    }
}
