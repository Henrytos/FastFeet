import { Redis } from 'ioredis';
import { EnvService } from '../env/env.service';
export declare class CacheRedisService extends Redis {
    constructor(envService: EnvService);
}
