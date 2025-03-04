import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

interface JwtConfig {
  secret: string;
  salt: string;
  expiresIn: string;
}

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  jwtConfig: JwtConfig;

  constructor(private configService: ConfigService) {
    this.jwtConfig = configService.get('jwt');
  }

  createJwtOptions(): JwtModuleOptions {
    return {
      global: true,
      secret: this.jwtConfig.secret,
      signOptions: {
        expiresIn: this.jwtConfig.expiresIn,
      },
    };
  }
}
