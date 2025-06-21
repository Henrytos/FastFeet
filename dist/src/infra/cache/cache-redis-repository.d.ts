import { CacheRedisService } from './cache-redis.service';
import { CacheRepository } from './cache-repository';
export declare class CacheRedisRepository implements CacheRepository {
    private readonly cache;
    constructor(cache: CacheRedisService);
    get(key: string): Promise<string>;
    set(key: string, value: string): Promise<void>;
    delete(key: string): Promise<void>;
}
