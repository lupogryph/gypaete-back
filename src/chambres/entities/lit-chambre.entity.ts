import type {Relation} from 'typeorm';
import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {ChambreEntity} from "./chambre.entity";
import {LitEntity} from "../../mobilier/lit/entities/lit.entity";

@Entity("lit_chambre")
export class LitChambreEntity {

    @PrimaryColumn()
    litId: number;

    @ManyToOne(() => LitEntity, (lit) => lit.chambres)
    @JoinColumn({name: "litId", referencedColumnName: "id"})
    lit: Relation<LitEntity>;

    @PrimaryColumn()
    chambreNumero: number;

    @ManyToOne(() => ChambreEntity, (chambre) => chambre.lits)
    @JoinColumn({name: "chambreNumero", referencedColumnName: "numero"})
    chambre: Relation<ChambreEntity>;

    @Column({default: 1})
    nombre: number


}
