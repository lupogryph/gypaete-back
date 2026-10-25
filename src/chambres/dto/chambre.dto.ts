import {ApiProperty} from "@nestjs/swagger";
import {CreateChambreDto} from "./create-chambre.dto";
import {LitChambreDto} from "./lit-chambre.dto";
import {PhotoDto} from "../../photo/dto/photo.dto";

export class ChambreDto extends CreateChambreDto {

    @ApiProperty()
    numero: number;

    @ApiProperty({type: [PhotoDto]})
    photos: PhotoDto[];

    @ApiProperty({type: [LitChambreDto]})
    lits: LitChambreDto[];

}
