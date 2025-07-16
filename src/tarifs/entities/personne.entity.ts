import {Entity, ManyToOne} from "typeorm";
import {ConditionEntity} from "./condition.entity";
import {ChambreEntity} from "../../chambres/entities/chambre.entity";

@Entity("tarif_personne")
export class PersonneEntity extends ConditionEntity {

    @ManyToOne(() => ChambreEntity, (c) => c.personnesSupplementaires)
    chambre: ChambreEntity;

}