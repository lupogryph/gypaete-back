import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity("photo")
export class PhotoEntity {

    @PrimaryColumn('uuid')
    id: string;

    @Column()
    url: string;

    @Column()
    thumbnailUrl: string;

    @Column()
    size: number;

}
