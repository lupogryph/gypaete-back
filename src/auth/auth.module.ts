import {forwardRef, Module} from "@nestjs/common";
import {JwtModule} from "@nestjs/jwt";
import {AuthService} from "./auth.service";
import {AuthController} from "./auth.controller";
import {AuthGuard} from "./auth.guard";
import {APP_GUARD} from "@nestjs/core";
import {JwtConfigService} from "./jwt.config.service";
import {UserModule} from "../user/user.module";
import {ConfigService} from "@nestjs/config";

@Module({
    imports: [
        forwardRef(() => UserModule),
        JwtModule.registerAsync({useClass: JwtConfigService, extraProviders: [ConfigService]}),
    ],
    providers: [
        AuthService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
        JwtConfigService,
        ConfigService,
    ],
    controllers: [AuthController],
    exports: [AuthService, JwtConfigService],
})
export class AuthModule {
}
