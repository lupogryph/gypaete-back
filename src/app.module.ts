import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MeetingModule } from './meeting/meeting.module';
import databaseConfig from './config/database.config';
import { TypeOrmConfigService } from './typeorm.config.service';
import jwtConfig from './auth/jwt.config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import dropboxConfig from "./dropbox/dropbox.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, jwtConfig, dropboxConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    AuthModule,
    UserModule,
    MeetingModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
  ],
})
export class AppModule {}
