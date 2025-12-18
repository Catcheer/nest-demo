import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Profile } from './user/profile.entity';
import { Log } from './logs/logs.entity';
import { Role } from './roles/roles.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const type = config.get<'mysql'>('DB_TYPE');
        const host = config.get<string>('DB_HOST');
        const port = config.get<number>('DB_PORT');
        const username = config.get<string>('DB_USERNAME');
        const password = config.get<string>('DB_PASSWORD') || '';

        const database = config.get<string>('DB_NAME');
        const synchronize = config.get<boolean>('DB_SYNCHRONIZE');
        // const logging = config.get<boolean>('DB_LOGGING');
        return {
          type,
          host,
          port,
          username,
          password,
          database,
          entities: [User, Profile, Log, Role], // 或 dist/**/*.entity.js
          synchronize,
          // logging,
          timezone: '+08:00',
          logging: ['warn', 'error'],
        };
      },
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
