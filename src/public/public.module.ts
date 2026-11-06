import { Module } from "@nestjs/common";
import { ChaletModule } from "../chalet/chalet.module";
import { ChambresModule } from "../chambres/chambres.module";
import { InfosModule } from "../infos/infos.module";
import { PublicController } from "./public.controller";
import { PublicService } from "./public.service";

@Module({
  imports: [ChaletModule, ChambresModule, InfosModule],
  controllers: [PublicController],
  providers: [PublicService],
})
export class PublicModule {}
