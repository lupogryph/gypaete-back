import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsArray, IsBoolean, IsNotEmpty, IsNumber, IsObject} from "class-validator";
import {ChaletDto} from "./chalet.dto";
import {PartialType} from "@nestjs/mapped-types";
import {FrEn} from "../../i18n/fren";
import {PrestationPayanteDto} from "../../tarifs/dto/prestation-payante.dto";
import {ConditionDto} from "../../tarifs/dto/condition.dto";

export class CreateChaletDto extends PartialType(ChaletDto) {

    @ApiProperty()
    @IsNotEmpty()
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

    @ApiPropertyOptional()
    @IsBoolean()
    animauxAutorises: boolean;

    @ApiPropertyOptional({type: [ConditionDto]})
    @IsArray()
    animaux: ConditionDto[];

    @ApiPropertyOptional({type: [PrestationPayanteDto]})
    @IsArray()
    prestationsPayantes: PrestationPayanteDto[];

}
