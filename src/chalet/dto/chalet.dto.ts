import {CreateChaletDto} from "./create-chalet.dto";
import {ApiProperty} from "@nestjs/swagger";
import {PeriodeDto} from "./periode.dto";

export class ChaletDto extends CreateChaletDto {

    @ApiProperty()
    id: number;

    @ApiProperty({type: [PeriodeDto]})
    periodes: PeriodeDto[];

}
