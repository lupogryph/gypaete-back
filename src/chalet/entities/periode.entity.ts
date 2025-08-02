import {Column, Entity, ManyToOne, PrimaryColumn} from "typeorm";
import {ChaletEntity} from "./chalet.entity";
import {Temporalite} from "../../tarifs/types/temporalite.enum";

@Entity("periode")
export class PeriodeEntity {

    @PrimaryColumn({type: 'date'})
    dateDebut: Date;

    @Column({type: 'date'})
    dateFin: Date;

    @Column({default: 0})
    cout: number;

    @Column({type: "enum", enum: Temporalite, default: Temporalite.Semaine})
    par: Temporalite;

    @ManyToOne(() => ChaletEntity, (chalet) => chalet.periodes)
    chalet: ChaletEntity;

}