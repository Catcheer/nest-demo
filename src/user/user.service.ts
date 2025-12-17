import { Injectable } from '@nestjs/common';
import { User } from './interface/user.interface';

@Injectable()
export class UserService {
  users: User[] = [
    {
      id: 1,
      name: 'Alice',
      createTime: new Date('2023-01-01'),
      rightTypes: ['admin', 'user'],
    },
    {
      id: 2,
      name: 'Bob',
      createTime: new Date('2023-02-01'),
      rightTypes: ['user'],
    },
  ];
  getById(id: number): User | undefined {
    // return `This action returns a #${id} user`;
    console.log('id', id);
    const user: User | undefined = this.users.find(
      (user) => user.id === Number(id),
    );
    return user;
  }
}
