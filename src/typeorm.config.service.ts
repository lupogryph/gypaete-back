import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Meeting } from './meeting/entities/meeting.entity';

interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
}

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  databaseConfig: DatabaseConfig;

  constructor(private configService: ConfigService) {
    this.databaseConfig = configService.get<DatabaseConfig>('database');
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      ...this.databaseConfig,
      type: 'mariadb',
      entities: [User, Meeting],
    };
  }
}
