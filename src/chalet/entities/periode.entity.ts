import {Column, Entity} from "typeorm";

@Entity("periode")
export class PeriodeEntity {

    @Column({ type: 'date' })
    dateDebut: Date;

    @Column({ type: 'date' })
    dateFin: Date;

    @Column()
    cout: number;

}