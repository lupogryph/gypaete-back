import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";

interface DropboxConfig {
    key: string;
    secret: string;
}

@Injectable()
export class DropboxConfigService {
    dropbox: DropboxConfig;

    constructor(configService: ConfigService) {
        this.dropbox = configService.get('dropbox');
    }
}
