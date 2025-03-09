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
exports.RolesGuards = void 0;
const prisma_service_1 = require("../../database/prisma/prisma.service");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
let RolesGuards = class RolesGuards {
    constructor(prisma, reflector) {
        this.prisma = prisma;
        this.reflector = reflector;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const rolesRequired = this.reflector.get('roles', context.getHandler());
        const { role, sub } = request.user;
        if (!rolesRequired || rolesRequired.length === 0) {
            return true;
        }
        if (!rolesRequired.includes(role)) {
            throw new common_1.UnauthorizedException('You do not have permission to perform this action.');
        }
        const user = await this.prisma.user.findUnique({
            where: { id: sub },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        return true;
    }
};
exports.RolesGuards = RolesGuards;
exports.RolesGuards = RolesGuards = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        core_1.Reflector])
], RolesGuards);
//# sourceMappingURL=roles.guards.js.map