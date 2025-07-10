import {Module} from "@nestjs/common";
import {DropboxService} from "./dropbox.service";
import {FileService} from "./file.service";
import {DbxEntity} from "./entities/dbx.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {HttpModule} from "@nestjs/axios";

@Module({
    imports: [TypeOrmModule.forFeature([DbxEntity]), HttpModule],
    providers: [DropboxService, FileService],
    exports: [DropboxService, FileService]
})
export class DropboxModule {
}
