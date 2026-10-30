import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsString} from "class-validator";

export class CreateLitDto {

    @ApiProperty()
    @IsString()
    classe: string;

    @ApiProperty()
    @IsNumber()
    largeur: number;

}
