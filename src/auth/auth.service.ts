import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as crypto from 'node:crypto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private configService: ConfigService,
  ) {}

  async connecter(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userRepository.findOneBy({ email: email });
    if (user == null || !user.activated) throw new UnauthorizedException("Utilisateur non existant ou non activé par l'administrateur");
    const db_hash = Buffer.from(user.password, 'hex');
    const salt = this.configService.get<string>('jwt.salt');
    const hash = crypto.scryptSync(password, salt, 24);
    if (crypto.timingSafeEqual(db_hash, hash)) {
      return {
        access_token: await this.jwtService.signAsync({
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
