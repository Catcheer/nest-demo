import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
// import { Profile } from './profile.entity';
import { Log } from '../logs/logs.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    // @InjectRepository(Profile)
    // private readonly profileRepository: Repository<Profile>,
    @InjectRepository(Log)
    private readonly logRepository: Repository<Log>,
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

  async findProfileByUserId(userId: number) {
    const user: User | null = await this.getById(userId);
    return this.userRepository.findOne({
      where: { id: user?.id },
      relations: {
        profile: true,
      },
    });
  }

  async findLogsByUserId(userId: number) {
    const user: User | null = await this.getById(userId);
    return this.userRepository.findOne({
      where: { id: user?.id },
      relations: {
        logs: true,
      },
    });
  }

  async getLogsByGroup(id: number): Promise<any> {
    const logs = await this.logRepository
      .createQueryBuilder('logs')
      .select('logs.result', 'result')
      .addSelect('COUNT(logs.result)', 'count')
      .leftJoinAndSelect('logs.user', 'user')
      .where('user.id=:id', { id })
      .groupBy('logs.result')
      .getRawMany();
    return logs;
  }
}
