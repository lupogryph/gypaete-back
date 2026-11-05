import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InfosService } from "./infos.service";
import { InfosController } from "./infos.controller";
import { Info } from "./entities/info.entity";
import { FirstInfosSeedService } from "./first-infos-seed.service";

@Module({
  imports: [TypeOrmModule.forFeature([Info])],
  controllers: [InfosController],
  providers: [InfosService, FirstInfosSeedService],
})
export class InfosModule {}
