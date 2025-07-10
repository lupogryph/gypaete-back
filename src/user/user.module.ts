import {forwardRef, Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserService} from "./user.service";
import {UserController} from "./user.controller";
import {User} from "./entities/user.entity";
import {UserAdminController} from "./user.admin.controller";
import {AuthModule} from "../auth/auth.module";

@Module({
    imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([User])],
    controllers: [UserController, UserAdminController],
    providers: [UserService],
    exports: [TypeOrmModule],
})
export class UserModule {
}
