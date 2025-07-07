import {PartialType} from '@nestjs/mapped-types';
import {ApiPropertyOptional} from '@nestjs/swagger';
import {CreateUserDto} from './create-user.dto';
import {IsEmail, IsOptional, MaxLength, MinLength} from 'class-validator';
import {Role} from 'src/auth/roles.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @ApiPropertyOptional()
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @MinLength(8)
    password?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @MaxLength(20)
    firstName?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @MaxLength(20)
    name?: string;

    @ApiPropertyOptional({name: 'role', enum: Role})
    @IsOptional()
    role?: Role;

}
