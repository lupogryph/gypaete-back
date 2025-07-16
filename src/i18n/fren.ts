import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export class FrEn {

    @ApiProperty()
    fr: string;

    @ApiPropertyOptional()
    en: string;

}