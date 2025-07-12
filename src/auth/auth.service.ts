import {Inject, Injectable, UnauthorizedException} from "@nestjs/common";
import * as crypto from "node:crypto";
import {JwtService} from "@nestjs/jwt";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "../user/entities/user.entity";
import jwtConfig from "./jwt.config";
import {ConfigType} from "@nestjs/config";

@Injectable()
export class AuthService {
    constructor(
        private jwt: JwtService,
        @InjectRepository(User)
        private repository: Repository<User>,
        @Inject(jwtConfig.KEY)
        private readonly config: ConfigType<typeof jwtConfig>,
    ) {
    }

    async connecter(
        email: string,
        password: string,
    ): Promise<{ access_token: string }> {
        const user = await this.repository.findOneBy({email: email});
        if (user == null) throw new UnauthorizedException("Erreur AS01");
        const db_hash = Buffer.from(user.password, 'hex');
        const salt = this.config.salt;
        const hash = crypto.scryptSync(password, salt, 24);
        if (crypto.timingSafeEqual(db_hash, hash)) {
            return {
                access_token: await this.jwt.signAsync({
                    sub: user.id,
                    email: user.email,
                    role: user.role,
                }),
            };
        } else {
            throw new UnauthorizedException();
        }
    }
}
