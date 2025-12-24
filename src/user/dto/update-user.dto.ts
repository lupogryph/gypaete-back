import {ApiPropertyOptional} from "@nestjs/swagger";
import {IsOptional} from "class-validator";
import {Role} from "../../auth/roles.enum";
import {CreateUserDto} from "./create-user.dto";

export class UpdateUserDto extends CreateUserDto {

    @ApiPropertyOptional()
    @IsOptional()
    email: string;

    @ApiPropertyOptional()
    @IsOptional()
    password: string;

    @ApiPropertyOptional()
    @IsOptional()
    firstName: string;

    @ApiPropertyOptional()
    @IsOptional()
    name: string;

    @ApiPropertyOptional({enum: Role, enumName: 'Role'})
    @IsOptional()
    role: Role;

}
