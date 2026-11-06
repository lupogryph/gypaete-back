import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Public } from "../auth/public.decorator";
import { PublicDataDto } from "./dto/public-data.dto";
import { PublicService } from "./public.service";

@ApiTags("public")
@Controller("public")
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  @Public()
  @Get()
  @ApiOkResponse({ type: PublicDataDto })
  find() {
    return this.publicService.find();
  }
}
