import {IsEmail, IsNotEmpty, IsStrongPassword, MaxLength, MinLength,} from "class-validator";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {Role} from "../../auth/roles.enum";

export class CreateUserDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @MinLength(8)
    @IsStrongPassword()
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(20)
    firstName: string;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(20)
    name: string;

    @ApiPropertyOptional({enum: Role})
    role: Role;

}
