import {Column, Entity, OneToMany, PrimaryColumn} from "typeorm";
import {PhotoEntity} from "../../photo/entities/photo.entity";
import {FrEn} from "../../i18n/fren";
import {BainDouche} from "../types/baignoireOuDouche.enum";
import {PrestationPayanteEntity} from "../../tarifs/entities/prestation-payante.entity";
import {AnimalEntity} from "../../tarifs/entities/animal.entity";
import {PersonneEntity} from "../../tarifs/entities/personne.entity";
import {LitChambreEntity} from "./lit-chambre.entity";

@Entity("chambre")
export class ChambreEntity {

    @PrimaryColumn()
    numero: number;

    @PrimaryColumn()
    nom: string;

    @OneToMany(() => PhotoEntity, (photo) => photo.chambre, {cascade: true})
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

    @OneToMany(() => PersonneEntity, (p) => p.chambre, {cascade: true})
    personnesSupplementaires: PersonneEntity[];

    @Column()
    animauxAutorises: boolean;

    @OneToMany(() => AnimalEntity, (a) => a.chambre, {cascade: true})
    animaux: AnimalEntity[];

    @OneToMany(() => PrestationPayanteEntity, (p) => p.chambre, {cascade: true})
    prestationsPayantes: PrestationPayanteEntity[];

}
