import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { InfosService } from "./infos.service";
import { CreateInfoDto } from "./dto/create-info.dto";
import { UpdateInfoDto } from "./dto/update-info.dto";
import { InfoDto } from "./dto/info.dto";

@ApiTags("infos")
@Controller("infos")
@ApiBearerAuth()
export class InfosController {
  constructor(private readonly infosService: InfosService) {}

  @ApiCreatedResponse({ type: InfoDto })
  @Post()
  async create(@Body() createInfoDto: CreateInfoDto): Promise<InfoDto> {
    const info = await this.infosService.create(createInfoDto);
    return plainToInstance(InfoDto, info);
  }

  @ApiOkResponse({ type: InfoDto, isArray: true })
  @Get()
  async findAll(): Promise<InfoDto[]> {
    const infos = await this.infosService.findAll();
    return plainToInstance(InfoDto, infos);
  }

  @ApiOkResponse({ type: InfoDto })
  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<InfoDto> {
    const info = await this.infosService.findOne(id);
    return plainToInstance(InfoDto, info);
  }

  @ApiOkResponse({ type: InfoDto })
  @ApiBody({ type: UpdateInfoDto })
  @Patch(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateInfoDto: UpdateInfoDto,
  ): Promise<InfoDto> {
    const info = await this.infosService.update(id, updateInfoDto);
    return plainToInstance(InfoDto, info);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.infosService.remove(id);
  }
}
