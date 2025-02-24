import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';
import { UserDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/entities/user.entity';

export class MeetingDto {
  @ApiPropertyOptional()
  id?: number;

  @ApiPropertyOptional()
  @Type(() => Date)
  date?: Date;

  @ApiPropertyOptional()
  location?: string;

  @ApiPropertyOptional()
  createdBy?: UserDto;

  @ApiPropertyOptional()
  updatedBy?: UserDto;
}
