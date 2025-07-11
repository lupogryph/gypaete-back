import {Inject, Injectable} from "@nestjs/common";
import {ConfigType} from "@nestjs/config";
import {TypeOrmModuleOptions, TypeOrmOptionsFactory} from "@nestjs/typeorm";
import {User} from "../user/entities/user.entity";
import {ChaletEntity} from "../chalet/entities/chalet.entity";
import {PhotoEntity} from "../photo/entities/photo.entity";
import {PrestationPayanteEntity} from "../tarifs/entities/prestation-payante.entity";
import {AnimalEntity} from "../tarifs/entities/animal.entity";
import databaseConfig from "./database.config";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {

    constructor(
        @Inject(databaseConfig.KEY)
        private config: ConfigType<typeof databaseConfig>,
    ) {
    }

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            ...this.config,
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
