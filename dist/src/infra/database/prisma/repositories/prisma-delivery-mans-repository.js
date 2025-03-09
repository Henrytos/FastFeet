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
exports.PrismaDeliveryMansRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_delivery_man_mapper_1 = require("../mappers/prisma-delivery-man-mapper");
const prisma_service_1 = require("../prisma.service");
let PrismaDeliveryMansRepository = class PrismaDeliveryMansRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async fetchDeliveryManByPage(page, perPage) {
        const deliveryMans = await this.prisma.user.findMany({
            where: {
                role: 'DELIVERY_MAN',
            },
            orderBy: {
                createdAt: 'desc',
            },
            skip: (page - 1) * perPage,
            take: perPage,
        });
        return deliveryMans.map(prisma_delivery_man_mapper_1.PrismaDeliveryManMapper.toDomain);
    }
    async create(deliveryMan) {
        const data = prisma_delivery_man_mapper_1.PrismaDeliveryManMapper.toPrisma(deliveryMan);
        await this.prisma.user.create({
            data,
        });
    }
    async findById(id) {
        const deliveryMan = await this.prisma.user.findUnique({
            where: {
                id,
            },
        });
        if (!deliveryMan) {
            return null;
        }
        return prisma_delivery_man_mapper_1.PrismaDeliveryManMapper.toDomain(deliveryMan);
    }
    async findByCpf(cpf) {
        const deliveryMan = await this.prisma.user.findUnique({
            where: {
                cpf: cpf.value,
            },
        });
        if (!deliveryMan) {
            return null;
        }
        return prisma_delivery_man_mapper_1.PrismaDeliveryManMapper.toDomain(deliveryMan);
    }
    async save(deliveryMan) {
        const data = prisma_delivery_man_mapper_1.PrismaDeliveryManMapper.toPrisma(deliveryMan);
        const deliveryManAlreadyExists = await this.findById(deliveryMan.id.toString());
        if (!deliveryManAlreadyExists) {
            throw new Error('Delivery man not found');
        }
        await this.prisma.user.update({
            where: {
                id: deliveryMan.id.toString(),
            },
            data,
        });
    }
    async delete(deliveryMan) {
        const deliveryManAlreadyExists = await this.findById(deliveryMan.id.toString());
        if (!deliveryManAlreadyExists) {
            throw new Error('Delivery man not found');
        }
        await this.prisma.user.delete({
            where: {
                id: deliveryMan.id.toString(),
            },
        });
    }
    async exists(id) {
        const deliveryMans = await this.findById(id);
        return !!deliveryMans;
    }
};
exports.PrismaDeliveryMansRepository = PrismaDeliveryMansRepository;
exports.PrismaDeliveryMansRepository = PrismaDeliveryMansRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaDeliveryMansRepository);
//# sourceMappingURL=prisma-delivery-mans-repository.js.map