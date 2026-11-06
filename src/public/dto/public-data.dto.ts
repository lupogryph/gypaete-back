import { ApiProperty } from "@nestjs/swagger";

export class PublicDataDto {
  @ApiProperty({ type: Object })
  chalet: Record<string, unknown>;

  @ApiProperty({ type: [Object] })
  chambres: Record<string, unknown>[];

  @ApiProperty({ type: Object })
  infos: Record<string, unknown>;
}
