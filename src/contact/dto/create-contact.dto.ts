import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsPhoneNumber} from "class-validator";

export class CreateContactDto {

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    address: string;

    @ApiProperty()
    @IsPhoneNumber()
    phone: string;

}
