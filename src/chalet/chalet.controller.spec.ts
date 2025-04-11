import { Test, TestingModule } from '@nestjs/testing';
import { ChaletController } from './chalet.controller';
import { ChaletService } from './chalet.service';

describe('ChaletController', () => {
  let controller: ChaletController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChaletController],
      providers: [ChaletService],
    }).compile();

    controller = module.get<ChaletController>(ChaletController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
