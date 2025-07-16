import {Column, Entity, ManyToOne, PrimaryColumn} from "typeorm";
import {ChaletEntity} from "./chalet.entity";

@Entity("periode")
export class PeriodeEntity {

    @PrimaryColumn({type: 'date'})
    dateDebut: Date;

    @Column({type: 'date'})
    dateFin: Date;

    @Column()
    cout: number;

    @ManyToOne(() => ChaletEntity, (chalet) => chalet.periodes)
    chalet: ChaletEntity;

}