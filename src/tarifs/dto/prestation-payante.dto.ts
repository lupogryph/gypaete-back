import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {FrEn} from "../../i18n/fren";
import {IsBoolean, IsNumber, IsObject} from "class-validator";

export class PrestationPayanteDto {

    @ApiProperty()
    @IsObject()
    condition: FrEn;

    @ApiProperty({minimum: 0})
    @IsNumber()
    cout: number;

    @ApiPropertyOptional()
    @IsBoolean()
    parPersonne: boolean;

    @ApiPropertyOptional()
    @IsBoolean()
    parNuit: boolean;

}
