import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";

interface AppConfig {
    name: string;
    https: boolean;
    host: string;
    port: number;
}

@Injectable()
export class AppConfigService {
    appConfig: AppConfig;

    constructor(private configService: ConfigService) {
        this.appConfig = this.configService.get('app');
    }

    baseUrl(): string {
        const protocol = this.appConfig.https ? 'https' : 'http';
        return `${protocol}://${this.appConfig.host}:${this.appConfig.port}`;
    }

}
