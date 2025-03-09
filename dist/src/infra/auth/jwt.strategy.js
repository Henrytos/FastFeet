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
exports.AuthStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const env_service_1 = require("../env/env.service");
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const tokenPayloadSchema = zod_1.z.object({
    sub: zod_1.z.string().uuid(),
    role: zod_1.z.enum([client_1.Role.ADMINISTRATOR, client_1.Role.DELIVERY_MAN]),
});
let AuthStrategy = class AuthStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(envService) {
        const publicKey = envService.get('JWT_PUBLIC_KEY');
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: Buffer.from(publicKey, 'base64'),
            algorithms: ['RS256'],
        });
    }
    async validate(payload) {
        return tokenPayloadSchema.parse(payload);
    }
};
exports.AuthStrategy = AuthStrategy;
exports.AuthStrategy = AuthStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [env_service_1.EnvService])
], AuthStrategy);
//# sourceMappingURL=jwt.strategy.js.map