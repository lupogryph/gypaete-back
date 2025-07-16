import {Column, Entity, ManyToOne} from "typeorm";
import {ChaletEntity} from "../../chalet/entities/chalet.entity";
import {ChambreEntity} from "../../chambres/entities/chambre.entity";
import {ConditionEntity} from "./condition.entity";

@Entity("tarif_prestation_payante")
export class PrestationPayanteEntity extends ConditionEntity {

    @Column({default: false})
    parPersonne: boolean;

    @ManyToOne(() => ChaletEntity, (c) => c.prestationsPayantes)
    chalet: ChaletEntity;

    @ManyToOne(() => ChambreEntity, (c) => c.prestationsPayantes)
    chambre: ChambreEntity;

}