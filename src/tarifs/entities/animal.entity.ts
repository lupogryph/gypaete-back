import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("animal")
export class AnimalEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'json'})
    condition: Map<'fr' | 'en', string>[];

    @Column()
    cout: number;

}