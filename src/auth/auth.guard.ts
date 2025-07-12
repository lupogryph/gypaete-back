import {CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException,} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {Request} from "express";
import {Reflector} from "@nestjs/core";
import {IS_PUBLIC_KEY} from "./public.decorator";
import appConfig from "../config/app.config";
import {ConfigType} from "@nestjs/config";
import * as process from "node:process";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        @Inject(appConfig.KEY)
        private readonly config: ConfigType<typeof appConfig>,
        private reflector: Reflector,
    ) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        if (!this.config.guard) {
            console.log('AuthGuard is disabled globally');
            return true; // possible security issue, but allows to disable the guard globally
        }
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException("Erreur AG01");
        }
        try {
            request['user'] = await this.jwtService.verifyAsync(token, {
                secret: process.env.SECRET,
            });
        } catch {
            throw new UnauthorizedException("Erreur AG02");
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
