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
    prenom: string;

    @Column()
    nom: string;

    @Exclude()
    @Column()
    mdp: string;

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
