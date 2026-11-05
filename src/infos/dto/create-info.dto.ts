import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsArray,
  IsObject,
  IsString,
  IsUrl,
  isURL,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "urlMap", async: false })
class UrlMapConstraint implements ValidatorConstraintInterface {
  validate(value: unknown): boolean {
    return (
      value !== null &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      Object.values(value).every(
        (url) =>
          typeof url === "string" && isURL(url, { require_protocol: true }),
      )
    );
  }

  defaultMessage(): string {
    return "must be an object with URL string values";
  }
}

export class CreateInfoDto {
  @ApiProperty()
  @IsString()
  postal: string;

  @ApiProperty({ type: [String], example: ["+33612345678", "+33733221100"] })
  @IsArray()
  @IsString({ each: true })
  phoneNumbers: string[];

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: "object",
    additionalProperties: { type: "string", format: "uri" },
    example: {
      facebook: "https://facebook.com/id/123456",
      x: "https://x.com/gypaete",
    },
  })
  @IsObject()
  @Validate(UrlMapConstraint)
  socialNetworks: Record<string, string>;

  @ApiProperty({
    type: [String],
    format: "uri",
    example: ["https://booking.example.com/chalet"],
  })
  @IsArray()
  @IsUrl({ require_protocol: true }, { each: true })
  reservationLinks: string[];
}
