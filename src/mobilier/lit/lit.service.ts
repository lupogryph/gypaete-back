import {Injectable} from '@nestjs/common';
import {CreateLitDto} from "./dto/create-lit.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {LitEntity} from "./entities/lit.entity";
import {Repository} from "typeorm";

@Injectable()
export class LitService {
    constructor(
        @InjectRepository(LitEntity)
        private readonly repository: Repository<LitEntity>,
    ) {
    }

    create(dto: CreateLitDto) {
        const lit = this.repository.create(dto);
        return this.repository.save(lit);
    }

    findAll() {
        return this.repository.find();
    }

    findOne(id: number) {
        return this.repository.findOneBy({id: id});
    }

    update(id: number, dto: CreateLitDto) {
        const lit = this.repository.create(dto);
        return this.repository.update(id, lit);
    }

    remove(id: number) {
        return this.repository.delete(id);
    }
}
