import { Controller, Get, Param, Request } from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MeetingDto } from './dto/meeting.dto';

@ApiBearerAuth()
@ApiTags('meeting')
@Controller('meetings')
export class MeetingsController {
  constructor(private readonly meetingService: MeetingService) {}

  @ApiOkResponse({ type: MeetingDto, isArray: true })
  @Get()
  findAll(@Request() req) {
    return this.meetingService.findAll(req.user.role);
  }

  @ApiOkResponse({ type: MeetingDto, isArray: true })
  @Get(':from/:to')
  findBetween(
    @Request() req,
    @Param('from') from: Date,
    @Param('to') to: Date,
  ) {
    return this.meetingService.findBetween(req.user.role, from, to);
  }
}
