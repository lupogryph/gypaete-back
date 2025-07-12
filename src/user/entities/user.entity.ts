import {Column, Entity, PrimaryGeneratedColumn, Unique,} from "typeorm";
import {Exclude} from "class-transformer";
import {Role} from "../../auth/roles.enum";

@Entity('user')
@Unique(['email'])
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    firstName: string;

    @Column()
    name: string;

    @Exclude()
    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER,
    })
    role: Role;

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}
