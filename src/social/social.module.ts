import {Module} from '@nestjs/common';
import {SocialService} from './social.service';
import {SocialController} from './social.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {SocialEntity} from "./entities/social.entity";

@Module({
  imports: [TypeOrmModule.forFeature([SocialEntity])],
  controllers: [SocialController],
  providers: [SocialService, TypeOrmModule],
})
export class SocialModule {}
