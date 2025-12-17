import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
// import { User } from './user.entity';

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

//   @Column(@oneToOne(() => User))
//   userId: number;
}
