import {IsEmail, MaxLength} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';
import {Role} from 'src/auth/roles.enum';

export class UserDto {

    @ApiPropertyOptional()
    @IsEmail()
    email?: string;

    @ApiPropertyOptional()
    @MaxLength(20)
    firstName?: string;

    @ApiPropertyOptional()
    @MaxLength(20)
    name?: string;

    @ApiPropertyOptional({name: 'role', enum: Role})
    role?: Role;

}
