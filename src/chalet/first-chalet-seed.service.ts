import {Injectable, Logger, OnApplicationBootstrap} from "@nestjs/common";
import {ChaletService} from "./chalet.service";

@Injectable()
export class FirstChaletSeedService implements OnApplicationBootstrap {
    private readonly logger = new Logger(FirstChaletSeedService.name);

    constructor(private readonly chaletService: ChaletService) {
    }

    async onApplicationBootstrap(): Promise<void> {
        if (process.env.MODE !== "DEV") {
            return;
        }

        if (await this.chaletService.findOne(1)) {
            this.logger.log(`First-chalet seed skipped; ${1} already exists.`);
            return;
        }

        await this.chaletService.create({
            nom: "Châlet le Gypaète",
            description: {fr: 'Châlet le Gypaète'},
        });
        this.logger.log(`Created first chalet`);
    }
}
