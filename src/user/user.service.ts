import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getById(id: number) {
    console.log('id', id);
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }

  async create(user: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async update(id: number, user: Partial<User>): Promise<User | null> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOneBy({ id });
  }

  delete(id: number) {
    return this.userRepository.delete(id);
  }
}
