import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as crypto from 'node:crypto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import {JwtConfigService} from "./jwt.config.service";

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    @InjectRepository(User)
    private repository: Repository<User>,
    private readonly config: JwtConfigService,
  ) {}

  async connecter(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.repository.findOneBy({ email: email });
    if (user == null) throw new UnauthorizedException("Erreur A01");
    const db_hash = Buffer.from(user.mdp, 'hex');
    const salt = this.config.jwtConfig.salt;
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
