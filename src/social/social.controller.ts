import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {SocialService} from './social.service';
import {CreateSocialDto} from './dto/create-social.dto';
import {UpdateSocialDto} from './dto/update-social.dto';
import {ApiBearerAuth, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {SocialDto} from "./dto/social.dto";

@ApiBearerAuth()
@ApiTags('social')
@Controller('social')
export class SocialController {
  constructor(private readonly socialService: SocialService) {}

  @ApiOkResponse({type: SocialDto})
  @Post()
  create(@Body() createSocialDto: CreateSocialDto) {
    return this.socialService.create(createSocialDto);
  }

  @ApiOkResponse({type: SocialDto, isArray: true})
  @Get()
  findAll() {
    return this.socialService.findAll();
  }

  @ApiOkResponse({type: SocialDto})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.socialService.findOne(+id);
  }

  @ApiOkResponse({type: SocialDto})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSocialDto: UpdateSocialDto) {
    return this.socialService.update(+id, updateSocialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.socialService.remove(+id);
  }
}
