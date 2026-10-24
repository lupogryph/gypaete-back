import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {LitService} from './lit.service';
import {CreateLitDto} from "./dto/create-lit.dto";
import {ApiBearerAuth, ApiOkResponse} from "@nestjs/swagger";
import {LitDto} from "./dto/lit.dto";

@ApiBearerAuth()
@Controller('mobilier/lit')
export class LitController {
    constructor(private readonly mobilierService: LitService) {
    }

    @ApiOkResponse({type: LitDto})
    @Post()
    create(@Body() createMobilierDto: CreateLitDto) {
        return this.mobilierService.create(createMobilierDto);
    }

    @ApiOkResponse({type: LitDto, isArray: true})
    @Get()
    findAll() {
        return this.mobilierService.findAll();
    }

    @ApiOkResponse({type: LitDto})
    @Get(':id')
    find(@Param('id') id: string) {
        return this.mobilierService.findOne(+id);
    }

    @ApiOkResponse({type: LitDto})
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateMobilierDto: CreateLitDto) {
        return this.mobilierService.update(+id, updateMobilierDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.mobilierService.remove(+id);
    }
}
