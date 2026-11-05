import { ApiProperty } from "@nestjs/swagger";
import { CreateInfoDto } from "./create-info.dto";

export class InfoDto extends CreateInfoDto {
  @ApiProperty()
  id: number;
}
