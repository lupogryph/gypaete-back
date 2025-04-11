import { Test, TestingModule } from '@nestjs/testing';
import { ChaletService } from './chalet.service';

describe('ChaletService', () => {
  let service: ChaletService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChaletService],
    }).compile();

    service = module.get<ChaletService>(ChaletService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
