import {Controller, Delete, Param} from "@nestjs/common";
import {PhotoService} from "./photo.service";

@Controller('photo')
export class PhotoController {
    constructor(private readonly photoService: PhotoService) {
    }

    @Delete(':id')
    deletePhoto(@Param('id') id: string) {
        return this.photoService.deletePhoto(id);
    }

}
