import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {PhotoEntity} from "../../photo/entities/photo.entity";
import {PrestationPayanteEntity} from "../../tarifs/entities/prestation-payante.entity";
import {FrEn} from "../../i18n/fren";
import {PeriodeEntity} from "./periode.entity";
import {ConditionEntity} from "../../tarifs/entities/condition.entity";

@Entity("chalet")
export class ChaletEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nom: string;

    @Column({type: "json", nullable: true})
    description: FrEn;

    @ManyToMany(() => PhotoEntity)
    @JoinTable({name: "chalet_photo"})
    photos: PhotoEntity[];

    @Column({type: "json", default: "[]"})
    prestations: FrEn[];

    @Column({default: 1})
    nombrePersonnesBase: number;

    @OneToMany(() => PeriodeEntity, p => p.chalet, {cascade: true})
    periodes: PeriodeEntity[];

    @Column({default: false})
    animauxAutorises: boolean;

    @ManyToMany(() => ConditionEntity, {cascade: true})
    @JoinTable({name: 'chalet_animaux'})
    animaux: ConditionEntity[];

    @ManyToMany(() => PrestationPayanteEntity, {cascade: true})
    @JoinTable({name: "chalet_prestation_payante"})
    prestationsPayantes: PrestationPayanteEntity[];

}
