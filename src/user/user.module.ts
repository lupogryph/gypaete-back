import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserService} from "./user.service";
import {UserController} from "./user.controller";
import {User} from "./entities/user.entity";
import {UserAdminController} from "./user.admin.controller";
import {FirstUserSeedService} from "./first-user-seed.service";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController, UserAdminController],
    providers: [UserService, FirstUserSeedService],
    exports: [TypeOrmModule, UserService],
})
export class UserModule {
}
