import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Dropbox } from 'dropbox';
import { DbxEntity } from './entities/dbx.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cron } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { authConstants } from '../auth/auth.constants';
import { RefreshResponse } from './dto/refresh.response.dto';
import fetch from 'node-fetch';

@Injectable()
export class DropboxService {
    constructor(
        @InjectRepository(DbxEntity)
        private dbxRepository: Repository<DbxEntity>,
        private readonly httpService: HttpService,
      ) {}

    async upload(path: string, file: Buffer): Promise<string> {
        const token = (await this.getTokens()).token;
        const dbx = new Dropbox({accessToken: token, fetch: fetch});
        return dbx.filesUpload({
            path: path,
            autorename: false,
            contents: file
        })
        .then(upload => 
            dbx.sharingCreateSharedLinkWithSettings({
                path: upload.result.path_lower,
                settings: {
                require_password: false,
                audience: {".tag": 'public'}
                }
            })
        )
        .then(share => {
            return share.result.url.replace('dl=0', 'raw=1');
        })
        .catch(error => {
            console.log(error);
            throw new InternalServerErrorException('dropbox error: ' + error, error);
        });
    }

    async delete(path: string) {
        const token = (await this.getTokens()).token;
        const dbx = new Dropbox({accessToken: token, fetch: fetch});
        return dbx.filesDeleteV2({path: path});
    }

    async getTokens() {
        const dbxLines = await this.dbxRepository.find({select: {token: true}});
        const dbxLine = dbxLines[0];
        if (dbxLine == null) {
            throw new InternalServerErrorException('dbx token not found');
        }
        return dbxLine;
    }

    //@Cron('*/1 * * * *')
    @Cron('*/50 * * * *')
    refresh() {
        this.dbxRepository.findOneBy({id: 1})
        .then(dbx => {
            const params = new URLSearchParams();
            params.append('refresh_token', dbx.refresh);
            params.append('grant_type', 'refresh_token');
            params.append('client_id', authConstants.dbx.key);
            params.append('client_secret', authConstants.dbx.secret);
            this.httpService.post<RefreshResponse>('https://api.dropbox.com/oauth2/token', params)
                .subscribe({
                    next: (refreshResponse) => {
                        dbx.token = refreshResponse.data.access_token;
                        this.dbxRepository.save(dbx)
                            .then(() => console.log('token refreshed'));
                    },
                    error: (error) => console.log(error)
                })
        })
        
    }

}
