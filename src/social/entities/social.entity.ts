import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("social")
export class SocialEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @Column()
    url: string;

}