import {ApiProperty} from "@nestjs/swagger";

export class SpaceDto {

    @ApiProperty()
    total: number;

    @ApiProperty()
    used: number;

    @ApiProperty()
    left: number;

}