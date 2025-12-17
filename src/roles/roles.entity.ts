import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
// import { User } from './user.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 255 })
  name: string;
//   @Column(@oneToOne(() => User))
//   userId: number;
}
