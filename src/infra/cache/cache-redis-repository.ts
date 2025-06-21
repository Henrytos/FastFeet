import { Injectable } from '@nestjs/common'
import { CacheRedisService } from './cache-redis.service'
import { CacheRepository } from './cache-repository'

@Injectable()
export class CacheRedisRepository implements CacheRepository {
  constructor(private readonly cache: CacheRedisService) {}
  async get(key: string) {
    const value = await this.cache.get(key)
    return value
  }

  async set(key: string, value: string): Promise<void> {
    await this.cache.set(key, value)
  }

  async delete(key: string): Promise<void> {
    await this.cache.del(key)
  }
}
