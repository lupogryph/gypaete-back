import {ApiProperty} from "@nestjs/swagger";
import {IsNumber} from "class-validator";

export class CreateLitDto {

    @ApiProperty()
    classe: string;

    @ApiProperty()
    @IsNumber()
    largeur: number;

}
