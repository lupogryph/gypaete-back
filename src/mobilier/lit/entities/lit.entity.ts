import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("lit")
export class LitEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    classe: string;

    @Column({nullable: true})
    largeur: number;

}
