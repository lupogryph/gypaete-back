import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/auth/roles.enum';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(8)
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(20)
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(20)
  name: string;

  @ApiProperty({ name: 'role', enum: Role })
  @IsOptional()
  role: Role;
}
