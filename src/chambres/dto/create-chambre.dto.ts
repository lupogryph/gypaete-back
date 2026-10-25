import {FrEn} from "../../i18n/fren";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsArray, IsBoolean, IsNumber, IsObject, IsOptional, IsString, Min} from "class-validator";
import {ConditionDto} from "../../tarifs/dto/condition.dto";
import {PrestationPayanteDto} from "../../tarifs/dto/prestation-payante.dto";

export class CreateChambreDto {

    @ApiProperty()
    @IsString()
    nom: string;

    @ApiPropertyOptional()
    @IsNumber()
    @Min(1)
    mombrePersonnes: number;

    @ApiPropertyOptional()
    @IsNumber()
    @Min(1)
    mombrePersonnesMax: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsObject()
    description?: FrEn;

    @ApiPropertyOptional()
    @IsOptional()
    pmr: boolean;

    @ApiPropertyOptional()
    @IsOptional()
    terrasse: boolean;

    @ApiPropertyOptional()
    @IsOptional()
    balcon: boolean;

    @ApiPropertyOptional({type: [FrEn]})
    @IsOptional()
    @IsArray()
    vues: FrEn[];

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    salleDeBain: number;

    @ApiPropertyOptional()
    @IsOptional()
    baignoire: boolean;

    @ApiPropertyOptional()
    @IsOptional()
    douche: boolean;

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    wc: number;

    @ApiPropertyOptional()
    @IsOptional()
    tv: boolean;

    @ApiPropertyOptional()
    @IsOptional()
    wifi: boolean;

    @ApiPropertyOptional({type: [FrEn]})
    @IsOptional()
    @IsArray()
    autres: FrEn[];

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    animauxAutorises?: boolean;

    @ApiPropertyOptional({type: [ConditionDto]})
    @IsOptional()
    @IsArray()
    animaux?: ConditionDto[];

    @ApiPropertyOptional({type: [PrestationPayanteDto]})
    @IsOptional()
    @IsArray()
    prestationsPayantes?: PrestationPayanteDto[];

    @ApiProperty()
    @IsNumber()
    @Min(0)
    cout: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    plusNuitMinimum: number;

    @ApiPropertyOptional({type: [PrestationPayanteDto]})
    @IsOptional()
    @IsArray()
    plusNuit: PrestationPayanteDto[];

    @ApiPropertyOptional({type: [ConditionDto]})
    @IsOptional()
    @IsArray()
    plusPersonne: ConditionDto[];

}
