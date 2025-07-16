import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn} from "typeorm";
import {PhotoEntity} from "../../photo/entities/photo.entity";
import {PrestationPayanteEntity} from "../../tarifs/entities/prestation-payante.entity";
import {FrEn} from "../../i18n/fren";
import {PeriodeEntity} from "./periode.entity";
import {ConditionEntity} from "../../tarifs/entities/condition.entity";

@Entity("chalet")
export class ChaletEntity {

    @PrimaryColumn()
    nom: string;

    @Column({type: "json"})
    description: FrEn;

    @ManyToMany(() => PhotoEntity)
    @JoinTable({name: "chalet_photo"})
    photos: PhotoEntity[];

    @Column({type: "json"})
    prestations: FrEn[];

    @Column()
    nombrePersonnesBase: number;

    @OneToMany(() => PeriodeEntity, p => p.chalet, {cascade: true})
    periodes: PeriodeEntity[];

    @Column()
    animauxAutorises: boolean;

    @ManyToMany(() => ConditionEntity)
    @JoinTable({name: 'chalet_animaux'})
    animaux: ConditionEntity[];

    @ManyToMany(() => PrestationPayanteEntity)
    @JoinTable({name: "chalet_prestation_payante"})
    prestationsPayantes: PrestationPayanteEntity[];

}
