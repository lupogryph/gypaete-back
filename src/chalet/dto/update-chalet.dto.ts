import {ApiPropertyOptional} from "@nestjs/swagger";
import {CreateChaletDto} from "./create-chalet.dto";
import {IsArray, IsOptional} from "class-validator";
import {CreatePeriodeDto} from "./create-periode.dto";

export class UpdateChaletDto extends CreateChaletDto {

    @ApiPropertyOptional()
    nom: string;

    @ApiPropertyOptional({type: [CreatePeriodeDto]})
    @IsOptional()
    @IsArray()
    periodes?: CreatePeriodeDto[];

}
