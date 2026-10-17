import {Injectable, Logger, OnApplicationBootstrap} from "@nestjs/common";
import {Role} from "../auth/roles.enum";
import {UserService} from "./user.service";

@Injectable()
export class FirstUserSeedService implements OnApplicationBootstrap {
    private readonly logger = new Logger(FirstUserSeedService.name);

    constructor(private readonly userService: UserService) {
    }

    async onApplicationBootstrap(): Promise<void> {
        if (process.env.MODE !== "DEV") {
            return;
        }

        const email = process.env.FIRST_USER_EMAIL;
        const password = process.env.FIRST_USER_PASSWORD;
        const firstName = process.env.FIRST_USER_FIRST_NAME;
        const name = process.env.FIRST_USER_NAME;

        if (!email || !password || !firstName || !name) {
            this.logger.warn("Skipping first-user seed: set FIRST_USER_EMAIL, FIRST_USER_PASSWORD, FIRST_USER_FIRST_NAME, and FIRST_USER_NAME.");
            return;
        }

        if (await this.userService.findByEmail(email)) {
            this.logger.log(`First-user seed skipped; ${email} already exists.`);
            return;
        }

        await this.userService.create({
            email,
            password,
            firstName,
            name,
            role: Role.ADMIN,
        });
        this.logger.log(`Created first admin user: ${email}`);
    }
}
