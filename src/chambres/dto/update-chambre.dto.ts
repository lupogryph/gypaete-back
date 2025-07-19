import {CreateChambreDto} from './create-chambre.dto';
import {ApiProperty} from "@nestjs/swagger";
import {IsNumber} from "class-validator";

export class UpdateChambreDto extends CreateChambreDto {

    @ApiProperty()
    @IsNumber()
    numero: number;

}
