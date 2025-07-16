import {Entity, ManyToOne} from "typeorm";
import {ConditionEntity} from "./condition.entity";
import {ChaletEntity} from "../../chalet/entities/chalet.entity";
import {ChambreEntity} from "../../chambres/entities/chambre.entity";

@Entity("tarif_animal")
export class AnimalEntity extends ConditionEntity {

    @ManyToOne(() => ChaletEntity, (c) => c.animaux)
    chalet: ChaletEntity;

    @ManyToOne(() => ChambreEntity, (c) => c.animaux)
    chambre: ChambreEntity;

}