import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from '../config/configuration';
import { Player } from './entities/player.entity';
import { MatchHistory } from './entities/match-history.entity';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const isTest = config.get<boolean>('isTest');

        if (isTest) {
          return {
            type: 'sqlite' as const,
            database: ':memory:',
            entities: [Player, MatchHistory],
            synchronize: true,
            dropSchema: true,
            logging: false
          };
        }

        return {
          type: 'postgres' as const,
          url: config.get<string>('databaseUrl'),
          entities: [Player, MatchHistory],
          synchronize: true,
          logging: false
        };
      }
    })
  ],
  exports: [TypeOrmModule]
})
export class DatabaseModule {}
