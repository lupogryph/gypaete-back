import {Column, Entity, OneToMany, PrimaryColumn} from "typeorm";
import {PhotoEntity} from "../../photo/entities/photo.entity";
import {PrestationPayanteEntity} from "../../tarifs/entities/prestation-payante.entity";
import {FrEn} from "../../i18n/fren";

@Entity("chalet")
export class ChaletEntity {

    @PrimaryColumn()
    nom: string;

    @Column({type: 'json'})
    description: FrEn;

    @OneToMany(() => PhotoEntity, p => p.id)
    photos: PhotoEntity[];

    @Column({type: 'json'})
    prestations: FrEn[];

    @Column()
    nombrePersonnesBase: number;

    @OneToMany(() => PrestationPayanteEntity, p => p.id)
    prestationsPayantes: PrestationPayanteEntity[];

}
