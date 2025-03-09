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
exports.PrismaDeliveryAddressRepository = void 0;
const prisma_service_1 = require("../prisma.service");
const common_1 = require("@nestjs/common");
const prisma_delivery_address_mapper_1 = require("../mappers/prisma-delivery-address-mapper");
let PrismaDeliveryAddressRepository = class PrismaDeliveryAddressRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findById(id) {
        const deliveryAddress = await this.prisma.address.findUnique({
            where: { id },
        });
        if (!deliveryAddress) {
            return null;
        }
        return prisma_delivery_address_mapper_1.PrismaDeliveryAddressMapper.toDomain(deliveryAddress);
    }
    async delete(id) {
        await this.prisma.address.delete({
            where: {
                id,
            },
        });
    }
    async create(deliveryAddress) {
        const data = prisma_delivery_address_mapper_1.PrismaDeliveryAddressMapper.toPrisma(deliveryAddress);
        await this.prisma.address.create({ data });
    }
    async save(deliveryAddress) {
        const data = prisma_delivery_address_mapper_1.PrismaDeliveryAddressMapper.toPrisma(deliveryAddress);
        await this.prisma.address.update({
            where: {
                id: deliveryAddress.id.toString(),
            },
            data,
        });
    }
    async exists(id) {
        const deliveryAddress = await this.findById(id);
        return !!deliveryAddress;
    }
};
exports.PrismaDeliveryAddressRepository = PrismaDeliveryAddressRepository;
exports.PrismaDeliveryAddressRepository = PrismaDeliveryAddressRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaDeliveryAddressRepository);
//# sourceMappingURL=prisma-delivery-address-repository.js.map