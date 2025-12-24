import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsDate, IsNumber, IsOptional, Min} from "class-validator";
import {Temporalite} from "../../tarifs/types/temporalite.enum";

export class CreatePeriodeDto {

    @ApiProperty()
    @IsDate()
    dateDebut: Date;

    @ApiProperty()
    @IsDate()
    dateFin: Date;

    @ApiProperty()
    @IsNumber()
    @Min(0)
    cout: number;

    @ApiPropertyOptional({enum: Temporalite, enumName: 'Temporalite'})
    @IsOptional()
    par: Temporalite;

}
