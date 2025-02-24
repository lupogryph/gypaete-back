import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('meeting')
export class Meeting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime' })
  date: Date;

  @Column()
  location: string;

  @ManyToOne(() => User, (user) => user.id)
  createdBy: User;

  @ManyToOne(() => User, (user) => user.id)
  updatedBy: User;
}
