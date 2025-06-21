"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheModule = void 0;
const common_1 = require("@nestjs/common");
const env_module_1 = require("../env/env.module");
const cache_repository_1 = require("./cache-repository");
const cache_redis_repository_1 = require("./cache-redis-repository");
const cache_redis_service_1 = require("./cache-redis.service");
let CacheModule = class CacheModule {
};
exports.CacheModule = CacheModule;
exports.CacheModule = CacheModule = __decorate([
    (0, common_1.Module)({
        imports: [env_module_1.EnvModule],
        providers: [
            cache_redis_service_1.CacheRedisService,
            {
                provide: cache_repository_1.CacheRepository,
                useClass: cache_redis_repository_1.CacheRedisRepository,
            },
        ],
        exports: [cache_repository_1.CacheRepository],
    })
], CacheModule);
//# sourceMappingURL=cache.module.js.map