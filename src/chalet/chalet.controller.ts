import {Body, Controller, Delete, Get, Param, Patch, Post, Put, UploadedFile, UseInterceptors} from "@nestjs/common";
import {ChaletService} from "./chalet.service";
import {CreateChaletDto} from "./dto/create-chalet.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {memoryStorage} from "multer";
import {Express} from "express";
import {ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse} from "@nestjs/swagger";
import {UploadDto} from "../photo/dto/upload.dto";
import {ChaletDto} from "./dto/chalet.dto";
import {Public} from "../auth/public.decorator";
import {CreatePhotoDto} from "../photo/dto/create-photo.dto";
import {CHALET_SINGLE_ID} from "./chalet.constants";

@Controller('chalet')
export class ChaletController {
    constructor(
        private readonly chaletService: ChaletService,
    ) {
    }

    @ApiOkResponse({type: ChaletDto})
    @ApiBearerAuth()
    @Post()
    create(@Body() dto: CreateChaletDto) {
        return this.chaletService.create(dto);
    }

    @ApiOkResponse({type: ChaletDto})
    @Public()
    @Get()
    find() {
        return this.chaletService.findOne(1);
    }

    @ApiOkResponse({type: ChaletDto})
    @ApiBearerAuth()
    @Patch()
    update(@Body() dto: CreateChaletDto) {
        return this.chaletService.update(CHALET_SINGLE_ID, dto);
    }

    @ApiBearerAuth()
    @Delete()
    remove() {
        return this.chaletService.remove(1);
    }

    // todo : a tester
    @ApiBearerAuth()
    @ApiConsumes("multipart/form-data")
    @ApiBody({description: "photo", type: UploadDto})
    @UseInterceptors(FileInterceptor('file', {storage: memoryStorage()}))
    @Put('/photo')
    uploadPhoto(
        @UploadedFile() file: Express.Multer.File
    ) {
        return this.chaletService.uploadPhoto(CHALET_SINGLE_ID, file.buffer);
    }

    @ApiBearerAuth()
    @Post('/photo')
    addPhoto(@Body() photo: CreatePhotoDto) {
        return this.chaletService.addPhoto(CHALET_SINGLE_ID, photo);
    }

    @ApiBearerAuth()
    @Delete('/photo/:id')
    deletePhoto(@Param('id') id: string) {
        return this.chaletService.deletePhoto(id);
    }

}
