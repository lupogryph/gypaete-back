import {Body, Controller, Delete, Get, Patch, Post, Put, UploadedFile, UseInterceptors} from "@nestjs/common";
import {ChaletService} from "./chalet.service";
import {CreateChaletDto} from "./dto/create-chalet.dto";
import {UpdateChaletDto} from "./dto/update-chalet.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {memoryStorage} from "multer";
import {Express} from "express";
import {ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse} from "@nestjs/swagger";
import {UploadDto} from "../photo/dto/upload.dto";
import {ChaletDto} from "./dto/chalet.dto";
import {Public} from "../auth/public.decorator";

@Controller('chalet')
export class ChaletController {
    constructor(
        private readonly chaletService: ChaletService,
    ) {
    }

    @ApiOkResponse({type: ChaletDto})
    @ApiBearerAuth()
    @Post()
    create(@Body() createChaletDto: CreateChaletDto) {
        return this.chaletService.create(createChaletDto);
    }

    @ApiOkResponse({type: ChaletDto})
    @Public()
    @Get()
    find() {
        return this.chaletService.findOne(1);
    }

    @ApiBearerAuth()
    @Patch()
    update(@Body() updateChaletDto: UpdateChaletDto) {
        return this.chaletService.update(updateChaletDto);
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
        return this.chaletService.uploadPhoto(1, file.buffer);
    }
}
