import {Module} from "@nestjs/common";
import {JwtModule} from "@nestjs/jwt";
import {AuthService} from "./auth.service";
import {AuthController} from "./auth.controller";
import {JwtConfigService} from "./jwt.config.service";
import {UserModule} from "../user/user.module";
import {ConfigService} from "@nestjs/config";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./local.strategy";
import {JwtStrategy} from "./jwt.strategy";
import {APP_GUARD} from "@nestjs/core";
import {JwtAuthGuard} from "./jwt-auth.guard";

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.registerAsync({useClass: JwtConfigService, extraProviders: [ConfigService]}),
    ],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        }

    ],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {
}
