import {Injectable, InternalServerErrorException} from "@nestjs/common";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";
import * as crypto from "node:crypto";
import {JwtConfigService} from "../auth/jwt.config.service";

@Injectable()
export class UserService {
    salt: string;

    constructor(
        @InjectRepository(User)
        private repository: Repository<User>,
        private jwtConfigService: JwtConfigService,
    ) {
        this.salt = this.jwtConfigService.jwtConfig.salt;
    }

    create(createUserDto: CreateUserDto) {
        createUserDto.password = this.hashPassword(createUserDto.password);
        const user = this.repository.create(createUserDto);
        return this.repository.save(user);
    }

    hashPassword(password: string) {
        const hash = crypto.scryptSync(password, this.salt, 24);
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
