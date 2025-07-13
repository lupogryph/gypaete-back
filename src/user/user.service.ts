import {Inject, Injectable, InternalServerErrorException} from "@nestjs/common";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";
import * as crypto from "node:crypto";
import {ConfigType} from "@nestjs/config";
import appConfig from "../config/app.config";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private repository: Repository<User>,
        @Inject(appConfig.KEY)
        private config: ConfigType<typeof appConfig>,
    ) {
    }

    create(createUserDto: CreateUserDto) {
        createUserDto.password = this.hashPassword(createUserDto.password);
        const user = this.repository.create(createUserDto);
        return this.repository.save(user);
    }

    encrypt(password: string) {
        return crypto.scryptSync(password, this.config.salt, 24);
    }

    hashPassword(password: string) {
        const hash = this.encrypt(password);
        if (hash == null) {
            throw new InternalServerErrorException();
        }
        return hash.toString('hex');
    }

    findAll() {
        return this.repository.find();
    }

    findById(id: number) {
        return this.repository.findOneBy({id: id});
    }

    findByEmail(email: string) {
        return this.repository.findOneBy({email: email});
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        if (updateUserDto.password != null) {
            updateUserDto.password = this.hashPassword(updateUserDto.password);
        }
        return this.repository.update(id, updateUserDto);
    }

    remove(id: number) {
        return this.repository.delete(id);
    }
}
