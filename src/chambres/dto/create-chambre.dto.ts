import {FrEn} from "../../i18n/fren";
import {BainDouche} from "../types/baignoireOuDouche.enum";
import {ApiPropertyOptional} from "@nestjs/swagger";
import {IsArray, IsNumber, IsOptional, Min} from "class-validator";
import {ConditionDto} from "../../tarifs/dto/condition.dto";
import {CreateChaletDto} from "../../chalet/dto/create-chalet.dto";

export class CreateChambreDto extends CreateChaletDto {

    @ApiPropertyOptional()
    @IsNumber()
    @Min(1)
    mombrePersonnesMax: number;

    @ApiPropertyOptional()
    @IsOptional()
    pmr: boolean;

    @ApiPropertyOptional()
    @IsOptional()
    lits: any; // todo: LitDto[]; // Assuming you have a LitDto defined somewhere

    @ApiPropertyOptional()
    @IsOptional()
    terasse: boolean;

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

    @ApiPropertyOptional({enum: BainDouche})
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

    @ApiPropertyOptional({type: [ConditionDto]})
    @IsOptional()
    @IsArray()
    personnesSupplementaires: ConditionDto[];

}
