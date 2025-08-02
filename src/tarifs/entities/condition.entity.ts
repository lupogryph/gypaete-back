import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {FrEn} from "../../i18n/fren";
import {Temporalite} from "../types/temporalite.enum";

@Entity("tarif_condition")
export class ConditionEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "json"})
    condition: FrEn;

    @Column()
    cout: number;

    @Column({type: "enum", enum: Temporalite, default: null, nullable: true})
    par: Temporalite

}