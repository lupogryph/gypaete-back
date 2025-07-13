import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Inject, Injectable} from '@nestjs/common';
import {ConfigType} from "@nestjs/config";
import jwtConfig from './jwt.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject(jwtConfig.KEY)
        private config: ConfigType<typeof jwtConfig>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.secret,
        });
    }

    async validate(payload: any) {
        return {id: payload.sub, email: payload.email};
    }
}
