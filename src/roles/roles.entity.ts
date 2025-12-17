import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { User } from '../user/user.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 255 })
  name: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
