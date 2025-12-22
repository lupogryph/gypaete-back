import {CreateSocialDto} from "./create-social.dto";
import {ApiProperty} from "@nestjs/swagger";

export class SocialDto extends CreateSocialDto {

    @ApiProperty()
    id: number;

}
