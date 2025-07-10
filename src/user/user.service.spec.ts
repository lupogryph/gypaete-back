import {Test, TestingModule} from "@nestjs/testing";
import {UserService} from "./user.service";
import {getRepositoryToken} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {JwtConfigService} from "../auth/jwt.config.service";

describe('UserService', () => {
    let service: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(User),
                    useValue: {}
                },
                {
                    provide: JwtConfigService,
                    useValue: {jwtConfig: {salt: 'salt'}}
                }
            ],
        })
            .compile();

        service = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
