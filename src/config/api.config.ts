import { registerAs } from '@nestjs/config';
import * as process from "node:process";

export default registerAs('api', () => ({
  https: process.env.API_HTTPS || true,
  host: process.env.API_HOST || "localhost",
  port: process.env.API_PORT || process.env.ALWAYSDATA_HTTPD_PORT || 3000,
}));
