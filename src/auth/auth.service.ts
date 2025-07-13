import {Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {UserService} from "../user/user.service";
import {User} from "../user/entities/user.entity";
import * as crypto from "node:crypto";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService,
    ) {
    }

    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);
        if (user && this.validatePasswords(password, user.password)) {
            return user;
        }
        return null;
    }

    validatePasswords(given: string, expected: string) {
        const expected_hash = Buffer.from(expected, 'hex');
        const hash = this.userService.encrypt(given);
        return crypto.timingSafeEqual(hash, expected_hash);
    }

    async login(user: User) {
        const payload = {email: user.email, sub: user.id};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
