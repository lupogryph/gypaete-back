import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeetingService } from './meeting.service';
import { MeetingController } from './meeting.controller';
import { MeetingsController } from './meetings.controller';
import { Meeting } from './entities/meeting.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Meeting]), UserModule],
  controllers: [MeetingController, MeetingsController],
  providers: [MeetingService],
  exports: [TypeOrmModule],
})
export class MeetingModule {}
