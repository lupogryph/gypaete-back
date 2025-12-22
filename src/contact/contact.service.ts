import {Injectable} from '@nestjs/common';
import {CreateContactDto} from './dto/create-contact.dto';
import {UpdateContactDto} from './dto/update-contact.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ContactEntity} from "./entities/contact.entity";

@Injectable()
export class ContactService {
  constructor(
      @InjectRepository(ContactEntity)
      private contactRepository: Repository<ContactEntity>
  ) {
  }

  create(createContactDto: CreateContactDto) {
    const contact = this.contactRepository.create(createContactDto);
    contact.id = 1;
    return this.contactRepository.save(contact);
  }

  findOne(id: number) {
    return this.contactRepository.findOne({ where: { id: id }});
  }

  update(id: number, updateContactDto: UpdateContactDto) {
    const contact = this.contactRepository.create(updateContactDto);
    return this.contactRepository.update(id, contact);
  }

  remove(id: number) {
    return this.contactRepository.delete(id);
  }
}
