import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {FrEn} from "../../i18n/fren";

export class PrestationPayanteDto {

    @ApiProperty()
    condition: FrEn;

    @ApiProperty({minimum: 0})
    cout: number;

    @ApiPropertyOptional()
    parPersonne?: boolean;

    @ApiPropertyOptional()
    parNuit?: boolean;

}
