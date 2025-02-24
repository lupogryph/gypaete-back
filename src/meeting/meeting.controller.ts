import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MeetingDto } from './dto/meeting.dto';

@ApiBearerAuth()
@ApiTags('meeting')
@Controller('meeting')
export class MeetingController {
  constructor(private readonly meetingService: MeetingService) {}

  @ApiOkResponse({ type: MeetingDto })
  @Post()
  create(@Request() req, @Body() createMeetingDto: CreateMeetingDto) {
    return this.meetingService.create(req.user.sub, createMeetingDto);
  }

  @ApiOkResponse({ type: MeetingDto })
  @Get(':id')
  findOne(@Request() req, @Param('id') id: number) {
    return this.meetingService.findOne(req.user.role, id);
  }

  @Patch(':id')
  update(
    @Request() req,
    @Param('id') id: number,
    @Body() updateMeetingDto: UpdateMeetingDto,
  ) {
    return this.meetingService.update(req.user.sub, id, updateMeetingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.meetingService.remove(id);
  }
}
