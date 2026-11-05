import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("infos")
export class Info {
  @PrimaryColumn()
  id: number;

  @Column()
  postal: string;

  @Column({ type: "json" })
  phoneNumbers: string[];

  @Column()
  email: string;

  @Column({ type: "json" })
  socialNetworks: Record<string, string>;

  @Column({ type: "json", default: "[]" })
  reservationLinks: string[];
}
