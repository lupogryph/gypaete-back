import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { InviteEntity } from '../../invite/entities/invite.entity';

export type Categorie = 'REGARD_TENDRE'| 'CRAVATTE'| 'EMBRASSENT'| 'AMOUREUX'| 'DERNIER_VERRE'| 'COIFFURE'| 'PREMIERE_DANSE'| 'GROS_CALIN'| 'GATEAU'| 'GROUPE'| 'GRIMACE'| 'ENFANTS'| 'SELFIE'| 'PIRE_DANSEUR'| 'PARENTS';

@Entity("photo")
@Unique(['invite', 'categorie'])
export class PhotoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'enum',
        enum: ['REGARD_TENDRE', 'CRAVATTE', 'EMBRASSENT', 'AMOUREUX', 'DERNIER_VERRE', 'COIFFURE', 'PREMIERE_DANSE', 'GROS_CALIN', 'GATEAU', 'GROUPE', 'GRIMACE', 'ENFANTS', 'SELFIE', 'PIRE_DANSEUR', 'PARENTS'],
        default: 'REGARD_TENDRE',
    })
    categorie: Categorie;

    @Column()
    url: string;

    @Column()
    dbxpath: string;

    @ManyToOne(() => InviteEntity, invite => invite.id)
    invite: InviteEntity;

}
