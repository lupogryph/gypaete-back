import {registerAs} from "@nestjs/config";

export default registerAs('jwt', () => ({
    secret: process.env.JWT_SECRET,
    salt: process.env.JWT_SALT,
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
}));
