import {Test, TestingModule} from "@nestjs/testing";
import {UserController} from "./user.controller";
import {getRepositoryToken} from "@nestjs/typeorm";
import {UserModule} from "./user.module";
import {User} from "./entities/user.entity";
import {ConfigService} from "@nestjs/config";

describe('UserController', () => {
    let controller: UserController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [UserModule],
        })
            .overrideProvider(getRepositoryToken(User)).useValue({})
            .overrideProvider(ConfigService).useValue({
                get: jest.fn((key: string) => {
                    if (key === 'jwt') {
                        return {secret: 'Test123', expiresIn: '1h'};
                    }
                })
            })
            .compile();

        controller = module.get<UserController>(UserController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
