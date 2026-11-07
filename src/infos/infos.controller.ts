import {
  Body,
  Controller,
  Delete,
  Get,
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
import {INFOS_SINGLE_ID} from "./infos.constants";

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

  @ApiOkResponse({ type: InfoDto })
  @Get()
  async find(): Promise<InfoDto> {
    const info = await this.infosService.findOne(INFOS_SINGLE_ID);
    return plainToInstance(InfoDto, info);
  }

  @ApiOkResponse({ type: InfoDto })
  @ApiBody({ type: UpdateInfoDto })
  @Patch()
  async update(
    @Body() updateInfoDto: UpdateInfoDto,
  ): Promise<InfoDto> {
    const info = await this.infosService.update(INFOS_SINGLE_ID, updateInfoDto);
    return plainToInstance(InfoDto, info);
  }

  @Delete()
  remove() {
    return this.infosService.remove(INFOS_SINGLE_ID);
  }
}
