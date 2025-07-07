import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';

interface ApiConfig {
    https: boolean;
    host: string;
    port: number;
}

@Injectable()
export class ApiConfigService {
    apiConfig: ApiConfig;

    constructor(private configService: ConfigService) {
        this.apiConfig = configService.get('api');
    }

    baseUrl(): string {
        const protocol = this.apiConfig.https ? 'https' : 'http';
        return `${protocol}://${this.apiConfig.host}:${this.apiConfig.port}`;
    }

}
