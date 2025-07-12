import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";
import {ChaletDto} from "./chalet.dto";

export class CreateChaletDto extends ChaletDto {

    @ApiProperty()
    @IsNotEmpty()
    readonly nom: string;

}
