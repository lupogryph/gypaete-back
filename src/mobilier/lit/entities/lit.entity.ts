import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {LitChambreEntity} from "../../../chambres/entities/lit-chambre.entity";

@Entity("lit")
export class LitEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    classe: string;

    @Column({nullable: true})
    largeur: number;

    @OneToMany(() => LitChambreEntity, (litChambre) => litChambre.lit)
    chambres: LitChambreEntity[];

}
