import {FrEn} from "../../i18n/fren";
import {BainDouche} from "../types/baignoireOuDouche.enum";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsArray, IsBoolean, IsNumber, IsOptional, IsString, Min} from "class-validator";
import {ConditionDto} from "../../tarifs/dto/condition.dto";
import {PrestationPayanteDto} from "../../tarifs/dto/prestation-payante.dto";

export class CreateChambreDto {

    @ApiProperty()
    @IsString()
    nom: string;

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

    @ApiPropertyOptional({enum: BainDouche, enumName: "BainDoucheEnum"})
    @IsOptional()
    bainDouche: BainDouche;

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
    @IsNumber()
    nuitSupplementaireMinimum: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    @Min(0)
    nuitSupplementaireCout: number;

    @ApiPropertyOptional()
    @IsNumber()
    @Min(1)
    mombrePersonnes: number;

    @ApiPropertyOptional()
    @IsNumber()
    @Min(1)
    mombrePersonnesMax: number;

    @ApiPropertyOptional({type: [ConditionDto]})
    @IsOptional()
    @IsArray()
    personnesSupplementaires: ConditionDto[];

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

}
