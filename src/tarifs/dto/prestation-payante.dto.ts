import {ApiPropertyOptional} from "@nestjs/swagger";
import {IsBoolean} from "class-validator";
import {ConditionDto} from "./condition.dto";

export class PrestationPayanteDto extends ConditionDto {

    @ApiPropertyOptional()
    @IsBoolean()
    parPersonne: boolean;

}
