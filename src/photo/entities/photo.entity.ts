import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ChaletEntity} from "../../chalet/entities/chalet.entity";
import {ChambreEntity} from "../../chambres/entities/chambre.entity";

@Entity("photo")
export class PhotoEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    url: string;

    @Column()
    thumbnailUrl: string;

    @ManyToOne(() => ChaletEntity, c => c.nom)
    chalet: ChaletEntity;

    @ManyToOne(() => ChambreEntity, c => c.numero)
    chambre: ChambreEntity;

}
