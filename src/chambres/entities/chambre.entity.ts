import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn} from "typeorm";
import {PhotoEntity} from "../../photo/entities/photo.entity";
import {FrEn} from "../../i18n/fren";
import {BainDouche} from "../types/baignoireOuDouche.enum";
import {PrestationPayanteEntity} from "../../tarifs/entities/prestation-payante.entity";
import {LitChambreEntity} from "./lit-chambre.entity";
import {ConditionEntity} from "../../tarifs/entities/condition.entity";

@Entity("chambre")
export class ChambreEntity {

    @PrimaryColumn()
    numero: number;

    @Column({unique: true})
    nom: string;

    @ManyToMany(() => PhotoEntity)
    @JoinTable({name: "chambre_photo"})
    photos: PhotoEntity[];

    @Column({default: 1})
    mombrePersonnesMax: number;

    @Column({type: "json"})
    description: FrEn;

    @Column({default: false})
    pmr: boolean;

    @OneToMany(() => LitChambreEntity, (l) => l.chambre)
    lits: LitChambreEntity[];

    @Column()
    terasse: boolean;

    @Column()
    balcon: boolean;

    @Column({type: "json"})
    vues: FrEn[];

    @Column()
    salleDeBain: number;

    @Column({type: "enum", enum: BainDouche, default: null, nullable: true})
    bainDouche: BainDouche;

    @Column()
    wc: number;

    @Column()
    tv: boolean;

    @Column()
    wifi: boolean;

    @Column({type: "json"})
    autres: FrEn[];

    @Column()
    nuitSupplementaireMinimum: number;

    @Column()
    nuitSupplementaireCout: number;

    @ManyToMany(() => ConditionEntity)
    @JoinTable({name: "chambre_personnes_supplementaires"})
    personnesSupplementaires: ConditionEntity[];

    @Column()
    animauxAutorises: boolean;

    @ManyToMany(() => ConditionEntity)
    @JoinTable({name: "chambre_animaux"})
    animaux: ConditionEntity[];

    @ManyToMany(() => PrestationPayanteEntity)
    @JoinTable({name: "chambre_prestation_payante"})
    prestationsPayantes: PrestationPayanteEntity[];

}
