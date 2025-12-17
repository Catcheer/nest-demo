import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('profile')
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gender: number;

  @Column({ length: 255 })
  photo: string;

  @Column({ length: 500 })
  address: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
