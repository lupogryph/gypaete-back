import {Controller, Delete, Get, Param} from "@nestjs/common";
import {PhotoService} from "./photo.service";
import {ApiBearerAuth, ApiOkResponse} from "@nestjs/swagger";
import {SpaceDto} from "./dto/space.dto";

@Controller('photo')
export class PhotoController {
    constructor(private readonly photoService: PhotoService) {
    }

    @ApiOkResponse({type: SpaceDto})
    @ApiBearerAuth()
    @Get('space')
    getSpace() {
        return this.photoService.space();
    }

    @ApiBearerAuth()
    @Delete(':id')
    deletePhoto(@Param('id') id: string) {
        return this.photoService.deletePhoto(id);
    }

}
