import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateMeetingDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Date)
  date: Date;

  @ApiProperty()
  @IsNotEmpty()
  location: string;
}
