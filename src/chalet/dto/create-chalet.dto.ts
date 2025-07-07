import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";
import {PrestationPayanteDto} from "../../tarifs/dto/prestation-payante.dto";
import {FrEn} from "../../i18n/fren";

export class CreateChaletDto {

    @ApiProperty()
    @IsNotEmpty()
    nom: string;

    @ApiProperty()
    description: FrEn;

    @ApiProperty({type: [FrEn]})
    prestations: FrEn[];

    @ApiProperty()
    nombrePersonnesBase: number;

    @ApiProperty({type: [PrestationPayanteDto]})
    prestationsPayantes: PrestationPayanteDto[];

}
