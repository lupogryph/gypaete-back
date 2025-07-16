import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {ChambreEntity} from "./chambre.entity";

@Entity("Lit")
export class LitEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    classe: string;

    @Column()
    largeur: number;

    @ManyToMany(() => ChambreEntity, (chambre) => chambre.lits)
    chambres: ChambreEntity[];

}