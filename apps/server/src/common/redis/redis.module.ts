import { Global, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-ioredis-yet';

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const isTest = config.get<boolean>('isTest');

        if (isTest) {
          return {
            ttl: 5 * 60
          };
        }

        return {
          store: await redisStore({
            url: config.get<string>('redisUrl')
          }),
          ttl: 5 * 60
        };
      }
    })
  ],
  exports: [CacheModule]
})
export class RedisModule {}
