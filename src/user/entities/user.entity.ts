import {Column, Entity, PrimaryGeneratedColumn,} from "typeorm";
import {Exclude} from "class-transformer";
import {Role} from "../../auth/roles.enum";

@Entity('user')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    email: string;

    @Column()
    firstName: string;

    @Column()
    name: string;

    @Exclude()
    @Column()
    password: string;

    @Column({type: 'enum', enum: Role, default: Role.USER})
    role: Role;

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}
