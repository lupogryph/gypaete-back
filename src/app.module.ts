import {ClassSerializerInterceptor, Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthModule} from "./auth/auth.module";
import {UserModule} from "./user/user.module";
import databaseConfig from "./database/database.config";
import {TypeOrmConfigService} from "./database/typeorm.config.service";
import jwtConfig from "./auth/jwt.config";
import {ChaletModule} from "./chalet/chalet.module";
import {TarifsModule} from "./tarifs/tarifs.module";
import {PhotoModule} from "./photo/photo.module";
import {ChambresModule} from './chambres/chambres.module';
import {ContactModule} from './contact/contact.module';
import {SocialModule} from './social/social.module';
import appConfig from "./config/app.config";
import * as classTransformer from 'class-transformer';
import {APP_INTERCEPTOR, Reflector} from "@nestjs/core";
import {MobilierModule} from './mobilier/mobilier.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.dev.env', '.env'],
            load: [appConfig, databaseConfig, jwtConfig],
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({useClass: TypeOrmConfigService}),
        AuthModule,
        UserModule,
        ChaletModule,
        PhotoModule,
        TarifsModule,
        ChambresModule,
        ContactModule,
        SocialModule,
        MobilierModule,
    ],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useFactory: (reflector: Reflector) =>
                new ClassSerializerInterceptor(reflector, {
                    transformerPackage: classTransformer,
                }),
            inject: [Reflector],
        },
    ],
})
export class AppModule {
}
