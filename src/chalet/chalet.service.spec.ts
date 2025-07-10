import {Test, TestingModule} from "@nestjs/testing";
import {ChaletService} from "./chalet.service";
import {getRepositoryToken} from "@nestjs/typeorm";
import {ChaletEntity} from "./entities/chalet.entity";
import {ChaletModule} from "./chalet.module";
import {PhotoEntity} from "../photo/entities/photo.entity";

describe('ChaletService', () => {
    let service: ChaletService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ChaletModule]
        })
            .overrideProvider(getRepositoryToken(ChaletEntity)).useValue({})
            .overrideProvider(getRepositoryToken(PhotoEntity)).useValue({})
            .compile();

        service = module.get<ChaletService>(ChaletService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
