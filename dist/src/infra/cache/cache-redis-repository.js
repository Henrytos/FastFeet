"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheRedisRepository = void 0;
const common_1 = require("@nestjs/common");
const cache_redis_service_1 = require("./cache-redis.service");
let CacheRedisRepository = class CacheRedisRepository {
    constructor(cache) {
        this.cache = cache;
    }
    async get(key) {
        const value = await this.cache.get(key);
        return value;
    }
    async set(key, value) {
        await this.cache.set(key, value);
    }
    async delete(key) {
        await this.cache.del(key);
    }
};
exports.CacheRedisRepository = CacheRedisRepository;
exports.CacheRedisRepository = CacheRedisRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cache_redis_service_1.CacheRedisService])
], CacheRedisRepository);
//# sourceMappingURL=cache-redis-repository.js.map