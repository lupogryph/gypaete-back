import {ApiProperty} from "@nestjs/swagger";
import {Temporalite} from "../../tarifs/types/temporalite.enum";
import {CreatePeriodeDto} from "./create-periode.dto";

export class PeriodeDto extends CreatePeriodeDto {

    @ApiProperty({enum: Temporalite, enumName: 'Temporalite'})
    par: Temporalite;

}
