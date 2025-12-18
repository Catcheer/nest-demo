import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
// import { Profile } from './profile.entity';
import { Log } from '../logs/logs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Log])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
