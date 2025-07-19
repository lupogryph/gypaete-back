import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsArray, IsBoolean, IsNotEmpty, IsNumber, IsObject, IsOptional} from "class-validator";
import {FrEn} from "../../i18n/fren";
import {PrestationPayanteDto} from "../../tarifs/dto/prestation-payante.dto";
import {ConditionDto} from "../../tarifs/dto/condition.dto";
import {CreatePeriodeDto} from "./create-periode.dto";

export class CreateChaletDto {

    @ApiProperty()
    @IsNotEmpty()
    nom: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsObject()
    description: FrEn;

    @ApiPropertyOptional({type: [FrEn]})
    @IsOptional()
    @IsArray()
    prestations: FrEn[];

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    nombrePersonnesBase: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsArray()
    periodes: CreatePeriodeDto[];

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    animauxAutorises: boolean;

    @ApiPropertyOptional({type: [ConditionDto]})
    @IsOptional()
    @IsArray()
    animaux: ConditionDto[];

    @ApiPropertyOptional({type: [PrestationPayanteDto]})
    @IsOptional()
    @IsArray()
    prestationsPayantes: PrestationPayanteDto[];

}
