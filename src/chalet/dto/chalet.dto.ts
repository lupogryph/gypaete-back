import {CreateChaletDto} from "./create-chalet.dto";
import {ApiProperty} from "@nestjs/swagger";
import {PhotoDto} from "../../photo/dto/photo.dto";

export class ChaletDto extends CreateChaletDto {

    @ApiProperty()
    id: number;

    @ApiProperty({type: [PhotoDto]})
    photos: PhotoDto[]

}
