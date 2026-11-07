import { ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsArray,
  IsEmail,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  Validate,
} from "class-validator";
import { UrlMapConstraint } from "./create-info.dto";

export class UpdateInfoDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  postal?: string;

  @ApiPropertyOptional({
    type: [String],
    example: ["+33612345678", "+33733221100"],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  phoneNumbers?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    type: "object",
    additionalProperties: { type: "string", format: "uri" },
  })
  @IsOptional()
  @IsObject()
  @Validate(UrlMapConstraint)
  socialNetworks?: Record<string, string>;

  @ApiPropertyOptional({
    type: [String],
    format: "uri",
  })
  @IsOptional()
  @IsArray()
  @IsUrl({ require_protocol: true }, { each: true })
  reservationLinks?: string[];
}
