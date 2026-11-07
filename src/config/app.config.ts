import {registerAs} from "@nestjs/config";
import * as process from "node:process";

const KEY = 'app';

export default registerAs(KEY, () => ({
    name: process.env.APP_NAME || "Chalet API",
    version: process.env.APP_VERSION || "0.0.0",
    https: !(process.env.APP_HTTPS === "false"),
    public_url: process.env.APP_PUBLIC_URL || "http://localhost:3000",
    host: process.env.APP_HOST || "localhost",
    port: parseInt(process.env.APP_PORT) || parseInt(process.env.PORT) || 3000,
    salt: process.env.APP_SALT,
    guard: !(process.env.APP_GUARD === "false"),
    photos_space: parseInt(process.env.APP_PHOTOS_SPACE) || 61440,
}));
