import {Test, TestingModule} from "@nestjs/testing";
import {ChaletController} from "./chalet.controller";
import {getRepositoryToken} from "@nestjs/typeorm";
import {ChaletEntity} from "./entities/chalet.entity";
import {PhotoEntity} from "../photo/entities/photo.entity";
import {ChaletModule} from "./chalet.module";

describe('ChaletController', () => {
    let controller: ChaletController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ChaletModule]
        })
            .overrideProvider(getRepositoryToken(ChaletEntity)).useValue({})
            .overrideProvider(getRepositoryToken(PhotoEntity)).useValue({})
            .compile();

        controller = module.get<ChaletController>(ChaletController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
