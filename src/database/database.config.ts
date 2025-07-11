import {registerAs} from "@nestjs/config";

const KEY = 'database';

export default registerAs(KEY, () => ({
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT) || 3306,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    synchronize: (process.env.DATABASE_SYNCHRONIZE === "true") || false,
}));
