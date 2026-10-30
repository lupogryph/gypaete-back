import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {LitDto} from "../../mobilier/lit/dto/lit.dto";
import {Allow, IsNumber, IsOptional} from "class-validator";

export class LitChambreDto {

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    chambreNumero: number;

    @ApiProperty()
    @IsNumber()
    litId: number;

    @ApiProperty()
    @IsNumber()
    nombre: number;

    @ApiPropertyOptional({type: LitDto})
    @IsOptional()
    @Allow()
    lit: LitDto;
}
