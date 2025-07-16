import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {ChambreEntity} from "./chambre.entity";
import {LitEntity} from "./lit.entity";

@Entity("lit_chambre")
export class LitChambreEntity {

    @PrimaryColumn()
    litId: number;

    @ManyToOne(() => LitEntity, (lit) => lit.chambres)
    @JoinColumn({name: "litId", referencedColumnName: "id"})
    lit: LitEntity;

    @PrimaryColumn()
    chambreNumero: number;

    @ManyToOne(() => ChambreEntity, (chambre) => chambre.lits)
    @JoinColumn({name: "chambreNumero", referencedColumnName: "numero"})
    chambre: ChambreEntity;

    @Column({default: 1})
    nombre: number


}