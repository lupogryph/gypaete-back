import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("photo")
export class PhotoEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    url: string;

    @Column()
    thumbnailUrl: string;

    @Column()
    size: number;

    @Column()
    order: number;

}
