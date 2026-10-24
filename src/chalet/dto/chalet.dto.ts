import {CreateChaletDto} from "./create-chalet.dto";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {PhotoDto} from "../../photo/dto/photo.dto";
import {IsArray} from "class-validator";
import {PeriodeDto} from "./periode.dto";

export class ChaletDto extends CreateChaletDto {

    @ApiProperty()
    id: number;

    @ApiProperty({type: [PhotoDto]})
    photos: PhotoDto[]

    @ApiPropertyOptional({type: [PeriodeDto]})
    @IsArray()
    periodes: PeriodeDto[];

}
