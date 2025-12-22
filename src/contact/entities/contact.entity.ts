import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('contact')
export class ContactEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    email: string;

    @Column()
    address: string;

    @Column()
    phone: string;

}
