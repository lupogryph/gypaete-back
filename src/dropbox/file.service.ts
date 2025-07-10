import {Injectable} from "@nestjs/common";

@Injectable()
export class FileService {

    getExt = (filename) => {
        let i = filename.lastIndexOf('.');
        if (i == -1) i = filename.length;
        return filename.substr(i);
    }

}
