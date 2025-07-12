import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {FrEn} from "../../i18n/fren";
import {ChaletEntity} from "../../chalet/entities/chalet.entity";

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

    @ManyToOne(() => ChaletEntity, c => c.prestationsPayantes)
    @JoinColumn({ name: 'chalet' })
    chalet: ChaletEntity;

}