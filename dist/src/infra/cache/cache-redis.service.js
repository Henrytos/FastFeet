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
exports.CacheRedisService = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = require("ioredis");
const env_service_1 = require("../env/env.service");
let CacheRedisService = class CacheRedisService extends ioredis_1.Redis {
    constructor(envService) {
        super({
            host: envService.get('REDIS_HOST'),
            port: envService.get('REDIS_PORT'),
            db: envService.get('REDIS_DB'),
        });
    }
};
exports.CacheRedisService = CacheRedisService;
exports.CacheRedisService = CacheRedisService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [env_service_1.EnvService])
], CacheRedisService);
//# sourceMappingURL=cache-redis.service.js.map