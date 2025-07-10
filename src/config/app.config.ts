import {registerAs} from "@nestjs/config";
import * as process from "node:process";

export default registerAs('app', () => ({
    name: process.env.APP_NAME || "Chalet API",
    https: process.env.APP_HTTPS || true,
    host: process.env.APP_HOST || "localhost",
    port: process.env.APP_PORT || process.env.ALWAYSDATA_HTTPD_PORT || 3000,
}));
