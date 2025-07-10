import {registerAs} from "@nestjs/config";

export default registerAs('dropbox', () => ({
    key: process.env.DROPBOX_KEY,
    secret: process.env.DROPBOX_SECRET
}));
