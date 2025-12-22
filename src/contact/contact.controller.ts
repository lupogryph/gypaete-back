import {Body, Controller, Delete, Get, Patch, Post} from '@nestjs/common';
import {ContactService} from './contact.service';
import {CreateContactDto} from './dto/create-contact.dto';
import {UpdateContactDto} from './dto/update-contact.dto';
import {ApiBearerAuth, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {ContactDto} from "./dto/contact.dto";

@ApiBearerAuth()
@ApiTags('contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @ApiOkResponse({type: ContactDto})
  @Post()
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactService.create(createContactDto);
  }

  @ApiOkResponse({type: ContactDto})
  @Get()
  find() {
    return this.contactService.findOne(1);
  }

  @ApiOkResponse({type: ContactDto})
  @Patch()
  update(@Body() updateContactDto: UpdateContactDto) {
    return this.contactService.update(1, updateContactDto);
  }

  @Delete()
  remove() {
    return this.contactService.remove(1);
  }
}
