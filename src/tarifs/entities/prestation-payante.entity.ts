import {Column, Entity} from "typeorm";
import {ConditionEntity} from "./condition.entity";

@Entity("tarif_prestation_payante")
export class PrestationPayanteEntity extends ConditionEntity {

    @Column({default: false})
    parPersonne: boolean;

}