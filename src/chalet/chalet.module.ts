import { Module } from '@nestjs/common';
import { ChaletService } from './chalet.service';
import { ChaletController } from './chalet.controller';

@Module({
  controllers: [ChaletController],
  providers: [ChaletService],
})
export class ChaletModule {}
