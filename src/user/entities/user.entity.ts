import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Role } from 'src/auth/roles.enum';
import { Meeting } from 'src/meeting/entities/meeting.entity';

@Entity('user')
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  name: string;

  @Exclude()
  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @Column()
  activated: boolean;

  @OneToMany(() => Meeting, (meeting) => meeting.createdBy)
  createdMeetings: Meeting[];

  @OneToMany(() => Meeting, (meeting) => meeting.updatedBy)
  updatedMeetings: Meeting[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
