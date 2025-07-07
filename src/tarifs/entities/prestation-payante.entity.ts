import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {FrEn} from "../../i18n/fren";

@Entity("prestationPayante")
export class PrestationPayanteEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'json'})
    condition: FrEn;

    @Column()
    cout: number;

    @Column({default: false})
    parPersonne: boolean;

    @Column({default: false})
    parNuit: boolean;

}