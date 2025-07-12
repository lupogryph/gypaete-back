import {ApiPropertyOptional} from "@nestjs/swagger";
import {PrestationPayanteDto} from "../../tarifs/dto/prestation-payante.dto";
import {FrEn} from "../../i18n/fren";
import {IsArray, IsNumber, IsObject, IsString} from "class-validator";

export class ChaletDto {

    @ApiPropertyOptional()
    @IsString()
    nom: string;

    @ApiPropertyOptional()
    @IsObject()
    description: FrEn;

    @ApiPropertyOptional({type: [FrEn]})
    @IsArray()
    prestations: FrEn[];

    @ApiPropertyOptional()
    @IsNumber()
    nombrePersonnesBase: number;

    @ApiPropertyOptional({type: [PrestationPayanteDto]})
    @IsArray()
    prestationsPayantes: PrestationPayanteDto[];

}
