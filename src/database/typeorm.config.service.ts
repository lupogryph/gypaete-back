import {Inject, Injectable} from "@nestjs/common";
import type {ConfigType} from "@nestjs/config";
import {TypeOrmModuleOptions, TypeOrmOptionsFactory} from "@nestjs/typeorm";
import {User} from "../user/entities/user.entity";
import {ChaletEntity} from "../chalet/entities/chalet.entity";
import {PhotoEntity} from "../photo/entities/photo.entity";
import {PrestationPayanteEntity} from "../tarifs/entities/prestation-payante.entity";
import {ConditionEntity} from "../tarifs/entities/condition.entity";
import databaseConfig from "./database.config";
import {ChambreEntity} from "../chambres/entities/chambre.entity";
import {LitEntity} from "../mobilier/lit/entities/lit.entity";
import {PeriodeEntity} from "../chalet/entities/periode.entity";
import {ContactEntity} from "../contact/entities/contact.entity";
import {SocialEntity} from "../social/entities/social.entity";
import pg from 'pg';

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
            type: 'postgres',
            driver: pg,
            entities: [
                User,
                ChaletEntity,
                PeriodeEntity,
                ChambreEntity,
                LitEntity,
                PhotoEntity,
                ConditionEntity,
                PrestationPayanteEntity,
                ContactEntity,
                SocialEntity
            ],
        };
    }
}
