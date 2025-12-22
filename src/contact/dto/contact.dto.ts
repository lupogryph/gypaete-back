import {ApiProperty} from "@nestjs/swagger";
import {CreateContactDto} from "./create-contact.dto";

export class ContactDto extends CreateContactDto {

    @ApiProperty()
    id: number;

}
