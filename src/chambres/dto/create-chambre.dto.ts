import {FrEn} from "../../i18n/fren";
import {BainDouche} from "../types/baignoireOuDouche.enum";
import {ApiPropertyOptional} from "@nestjs/swagger";
import {IsArray, IsNumber, Min} from "class-validator";
import {ConditionDto} from "../../tarifs/dto/condition.dto";
import {CreateChaletDto} from "../../chalet/dto/create-chalet.dto";

export class CreateChambreDto extends CreateChaletDto {

    @ApiPropertyOptional()
    @IsNumber()
    @Min(1)
    mombrePersonnesMax: number;

    @ApiPropertyOptional()
    pmr: boolean;

    @ApiPropertyOptional()
    lits: any;

    @ApiPropertyOptional()
    terasse: boolean;

    @ApiPropertyOptional()
    balcon: boolean;

    @ApiPropertyOptional({type: [FrEn]})
    @IsArray()
    vues: FrEn[];

    @ApiPropertyOptional()
    @IsNumber()
    salleDeBain: number;

    @ApiPropertyOptional({enum: BainDouche})
    bainDouche: BainDouche;

    @ApiPropertyOptional()
    @IsNumber()
    wc: number;

    @ApiPropertyOptional()
    tv: boolean;

    @ApiPropertyOptional()
    wifi: boolean;

    @ApiPropertyOptional({type: [FrEn]})
    @IsArray()
    autres: FrEn[];

    @ApiPropertyOptional()
    @IsNumber()
    nuitSupplementaireMinimum: number;

    @ApiPropertyOptional()
    @IsNumber()
    @Min(0)
    nuitSupplementaireCout: number;

    @ApiPropertyOptional({type: [ConditionDto]})
    @IsArray()
    personnesSupplementaires: ConditionDto[];

}
