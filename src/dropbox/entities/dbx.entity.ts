import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("dbx")
export class DbxEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    token: string;
    @Column()
    refresh: string;
    @Column()
    time: number;
}
