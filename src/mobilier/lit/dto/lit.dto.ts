import {ApiProperty} from "@nestjs/swagger";
import {CreateLitDto} from "./create-lit.dto";
import {IsNumber} from "class-validator";

export class LitDto extends CreateLitDto {

    @ApiProperty()
    @IsNumber()
    id: number;

}
