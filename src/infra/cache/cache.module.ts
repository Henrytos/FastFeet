import { Module } from '@nestjs/common'
import { EnvModule } from '../env/env.module'
import { CacheRepository } from './cache-repository'
import { CacheRedisRepository } from './cache-redis-repository'
import { CacheRedisService } from './cache-redis.service'

@Module({
  imports: [EnvModule],
  providers: [
    CacheRedisService,
    {
      provide: CacheRepository,
      useClass: CacheRedisRepository,
    },
  ],
  exports: [CacheRepository],
})
export class CacheModule {}
