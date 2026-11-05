import { Injectable, Logger, OnApplicationBootstrap } from "@nestjs/common";
import { InfosService } from "./infos.service";

@Injectable()
export class FirstInfosSeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(FirstInfosSeedService.name);

  constructor(private readonly infosService: InfosService) {}

  async onApplicationBootstrap(): Promise<void> {
    if (process.env.MODE !== "DEV") {
      return;
    }

    const infos = await this.infosService.findAll();
    if (infos.length > 0) {
      this.logger.log("First-infos seed skipped; 1 already exists.");
      return;
    }

    await this.infosService.create({
      postal: "",
      phoneNumbers: [],
      email: "",
      socialNetworks: {},
      reservationLinks: [],
    });
    this.logger.log("Created first infos record.");
  }
}
