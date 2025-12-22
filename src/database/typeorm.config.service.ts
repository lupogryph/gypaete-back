import {Inject, Injectable} from "@nestjs/common";
import {ConfigType} from "@nestjs/config";
import {TypeOrmModuleOptions, TypeOrmOptionsFactory} from "@nestjs/typeorm";
import {User} from "../user/entities/user.entity";
import {ChaletEntity} from "../chalet/entities/chalet.entity";
import {PhotoEntity} from "../photo/entities/photo.entity";
import {PrestationPayanteEntity} from "../tarifs/entities/prestation-payante.entity";
import {ConditionEntity} from "../tarifs/entities/condition.entity";
import databaseConfig from "./database.config";
import {ChambreEntity} from "../chambres/entities/chambre.entity";
import {LitEntity} from "../chambres/entities/lit.entity";
import {PeriodeEntity} from "../chalet/entities/periode.entity";
import {LitChambreEntity} from "../chambres/entities/lit-chambre.entity";
import {ContactEntity} from "../contact/entities/contact.entity";
import {SocialEntity} from "../social/entities/social.entity";

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
                PeriodeEntity,
                ChambreEntity,
                LitEntity,
                LitChambreEntity,
                PhotoEntity,
                ConditionEntity,
                PrestationPayanteEntity,
                ContactEntity,
                SocialEntity
            ],
        };
    }
}
