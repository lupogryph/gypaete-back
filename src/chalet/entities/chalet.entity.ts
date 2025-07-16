import {Column, Entity, OneToMany, PrimaryColumn} from "typeorm";
import {PhotoEntity} from "../../photo/entities/photo.entity";
import {PrestationPayanteEntity} from "../../tarifs/entities/prestation-payante.entity";
import {FrEn} from "../../i18n/fren";
import {PeriodeEntity} from "./periode.entity";
import {AnimalEntity} from "../../tarifs/entities/animal.entity";

@Entity("chalet")
export class ChaletEntity {

    @PrimaryColumn()
    nom: string;

    @Column({type: "json"})
    description: FrEn;

    @OneToMany(() => PhotoEntity, p => p.id)
    photos: PhotoEntity[];

    @Column({type: "json"})
    prestations: FrEn[];

    @Column()
    nombrePersonnesBase: number;

    @OneToMany(() => PeriodeEntity, p => p.chalet, {cascade: true})
    periodes: PeriodeEntity[];

    @Column()
    animauxAutorises: boolean;

    @OneToMany(() => AnimalEntity, c => c.chalet, {cascade: true})
    animaux: AnimalEntity[];

    @OneToMany(() => PrestationPayanteEntity, p => p.chalet, {cascade: true})
    prestationsPayantes: PrestationPayanteEntity[];

}
