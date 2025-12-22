import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsUrl} from "class-validator";

export class CreateSocialDto {

    @ApiProperty()
    @IsNotEmpty()
    type: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsUrl()
    url: string;

}
