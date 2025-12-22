import {registerAs} from "@nestjs/config";
import type {StringValue} from "ms";

const KEY = 'jwt';

export default registerAs(KEY, () => ({
    secret: process.env.JWT_SECRET,
    salt: process.env.JWT_SALT,
    expiresIn: (process.env.JWT_EXPIRES_IN || '1h') as StringValue,
}));
