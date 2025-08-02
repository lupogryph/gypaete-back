import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {FrEn} from "../../i18n/fren";
import {IsEnum, IsNumber, IsObject} from "class-validator";
import {Temporalite} from "../types/temporalite.enum";

export class ConditionDto {

    @ApiProperty()
    @IsObject()
    condition: FrEn;

    @ApiProperty({minimum: 0})
    @IsNumber()
    cout: number;

    @ApiPropertyOptional({enum: Temporalite})
    @IsEnum(Temporalite)
    par: Temporalite;

}
