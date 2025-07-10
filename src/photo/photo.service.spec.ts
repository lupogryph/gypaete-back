import {Test, TestingModule} from "@nestjs/testing";
import {PhotoService} from "./photo.service";
import {PhotoModule} from "./photo.module";
import {PhotoEntity} from "./entities/photo.entity";
import {getRepositoryToken} from "@nestjs/typeorm";

describe('PhotoService', () => {
    let service: PhotoService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [PhotoModule]
        })
            .overrideProvider(getRepositoryToken(PhotoEntity)).useValue({})
            .compile();

        service = module.get<PhotoService>(PhotoService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
