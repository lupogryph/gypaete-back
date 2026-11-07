import type {Relation} from 'typeorm'
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {ChaletEntity} from "./chalet.entity";
import {Temporalite} from "../../tarifs/types/temporalite.enum";

@Entity("periode")
export class PeriodeEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'date'})
    dateDebut: Date;

    @Column({type: 'date'})
    dateFin: Date;

    @Column({type: "double precision", default: 0})
    cout: number;

    @Column({type: "enum", enum: Temporalite, default: Temporalite.Semaine})
    par: Temporalite;

    @ManyToOne(() => ChaletEntity, (chalet) => chalet.periodes)
    chalet: Relation<ChaletEntity>;

}
