import {ClassSerializerInterceptor, Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthModule} from "./auth/auth.module";
import {UserModule} from "./user/user.module";
import databaseConfig from "./database/database.config";
import {TypeOrmConfigService} from "./database/typeorm.config.service";
import jwtConfig from "./auth/jwt.config";
import {APP_INTERCEPTOR} from "@nestjs/core";
import {ChaletModule} from "./chalet/chalet.module";
import {TarifsModule} from "./tarifs/tarifs.module";
import dropboxConfig from "./dropbox/dropbox.config";
import {PhotoModule} from "./photo/photo.module";
import appConfig from "./config/app.config";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.dev.env',
            load: [appConfig, databaseConfig, jwtConfig, dropboxConfig],
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({useClass: TypeOrmConfigService}),
        AuthModule,
        UserModule,
        ChaletModule,
        PhotoModule,
        TarifsModule,
    ],
    providers: [
        {provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor},
    ],
})
export class AppModule {
}
