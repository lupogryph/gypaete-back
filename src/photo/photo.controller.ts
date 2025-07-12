import {Controller, Delete, Param} from "@nestjs/common";
import {PhotoService} from "./photo.service";
import {ApiBearerAuth} from "@nestjs/swagger";

@Controller('photo')
export class PhotoController {
    constructor(private readonly photoService: PhotoService) {
    }

    @ApiBearerAuth()
    @Delete(':id')
    deletePhoto(@Param('id') id: string) {
        return this.photoService.deletePhoto(id);
    }

}
