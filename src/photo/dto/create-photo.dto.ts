import {ApiProperty} from "@nestjs/swagger";
import {IsUrl} from "class-validator";

export class CreatePhotoDto {
    @ApiProperty()
    @IsUrl({protocols: ['https'], require_protocol: true})
    url: string;

    @ApiProperty()
    @IsUrl({protocols: ['https'], require_protocol: true})
    thumbnailUrl: string;
}