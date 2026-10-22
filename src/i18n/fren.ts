import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsOptional} from "class-validator";

export class FrEn {

    @ApiProperty()
    fr: string;

    @ApiPropertyOptional()
    @IsOptional()
    en?: string;

}
