import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {LitChambreEntity} from "./lit-chambre.entity";

@Entity("lit")
export class LitEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    classe: string;

    @Column()
    largeur: number;

    @OneToMany(() => LitChambreEntity, (l) => l.lit)
    chambres: LitChambreEntity[];

}