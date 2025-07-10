import {Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique} from 'typeorm';
import {ChaletEntity} from "../../chalet/entities/chalet.entity";

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

}
