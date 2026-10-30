import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {LitService} from './lit.service';
import {CreateLitDto} from "./dto/create-lit.dto";
import {ApiBearerAuth, ApiOkResponse} from "@nestjs/swagger";
import {LitDto} from "./dto/lit.dto";

@ApiBearerAuth()
@Controller('mobilier/lit')
export class LitController {
    constructor(private readonly service: LitService) {
    }

    @ApiOkResponse({type: LitDto})
    @Post()
    create(@Body() dto: CreateLitDto) {
        return this.service.create(dto);
    }

    @ApiOkResponse({type: LitDto, isArray: true})
    @Get()
    findAll() {
        return this.service.findAll();
    }

    @ApiOkResponse({type: LitDto})
    @Get(':id')
    find(@Param('id') id: string) {
        return this.service.findOne(+id);
    }

    @ApiOkResponse({type: LitDto})
    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: CreateLitDto) {
        return this.service.update(+id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(+id);
    }
}
