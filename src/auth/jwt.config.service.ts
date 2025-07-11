import {Inject, Injectable} from "@nestjs/common";
import {ConfigType} from "@nestjs/config";
import {JwtModuleOptions, JwtOptionsFactory} from "@nestjs/jwt";
import jwtConfig from "./jwt.config";

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {

    constructor(
        @Inject(jwtConfig.KEY)
        private config: ConfigType<typeof jwtConfig>) {
    }

    createJwtOptions(): JwtModuleOptions {
        return {
            global: true,
            secret: this.config.secret,
            signOptions: {
                expiresIn: this.config.expiresIn,
            },
        };
    }
}
