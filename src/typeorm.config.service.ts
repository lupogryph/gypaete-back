import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {TypeOrmModuleOptions, TypeOrmOptionsFactory} from '@nestjs/typeorm';
import {User} from './user/entities/user.entity';
import {ChaletEntity} from "./chalet/entities/chalet.entity";
import {PhotoEntity} from "./photo/entities/photo.entity";
import {PrestationPayanteEntity} from "./tarifs/entities/prestation-payante.entity";
import {AnimalEntity} from "./tarifs/entities/animal.entity";

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
            entities: [
                User,
                ChaletEntity,
                PhotoEntity,
                PrestationPayanteEntity,
                AnimalEntity,
            ],
        };
    }
}
