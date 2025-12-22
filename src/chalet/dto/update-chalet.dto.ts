import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {CreateChaletDto} from "./create-chalet.dto";
import {IsNumber} from "class-validator";

export class UpdateChaletDto extends CreateChaletDto {

    @ApiPropertyOptional()
    nom: string;

}
