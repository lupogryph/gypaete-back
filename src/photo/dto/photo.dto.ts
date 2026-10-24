import {ApiProperty} from "@nestjs/swagger";
import {CreatePhotoDto} from "./create-photo.dto";

export class PhotoDto extends CreatePhotoDto {

    @ApiProperty()
    id: string;

    @ApiProperty()
    size: number;

}
