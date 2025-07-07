import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {AuthGuard} from './auth.guard';
import {APP_GUARD} from '@nestjs/core';
import {JwtConfigService} from './jwt.config.service';
import {UserModule} from 'src/user/user.module';

@Module({
    imports: [
        UserModule,
        JwtModule.registerAsync({useClass: JwtConfigService}),
    ],
    providers: [
        AuthService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
        JwtConfigService
    ],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {
}
