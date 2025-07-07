import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("animal")
export class AnimalEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    condition: Map<'fr' | 'en', string>[];

    @Column()
    cout: number;

}