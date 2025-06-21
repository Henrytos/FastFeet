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
exports.PrismaOrdersRepository = void 0;
const get_distance_between_coordinate_1 = require("../../../../../test/utils/get-distance-between-coordinate");
const prisma_order_mapper_1 = require("../mappers/prisma-order-mapper");
const prisma_service_1 = require("../prisma.service");
const common_1 = require("@nestjs/common");
const prisma_order_with_details_1 = require("../mappers/prisma-order-with-details");
const order_with_distance_1 = require("../../../../domain/delivery/enterprise/entities/value-object/order-with-distance");
const order_status_enum_1 = require("../../../../core/constants/order-status.enum");
const domain_events_1 = require("../../../../core/events/domain-events");
let PrismaOrdersRepository = class PrismaOrdersRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    getMetricsOfWeek(pastTargetWeek) {
        console.log('getMetricsOfWeek method is not implemented in PrismaOrdersRepository.', pastTargetWeek);
        throw new Error('Method not implemented.');
    }
    async create(order) {
        const data = prisma_order_mapper_1.PrismaOrderMapper.toPrisma(order);
        domain_events_1.DomainEvents.dispatchEventsForAggregate(order.id);
        await this.prisma.order.create({ data });
    }
    async findByIdWithDetails(id) {
        const order = await this.prisma.order.findUnique({
            where: { id },
            include: {
                address: true,
                recipient: true,
                deliveryMan: true,
            },
        });
        if (!order) {
            return null;
        }
        return prisma_order_with_details_1.PrismaOrderWithDetailsMapper.toDomain(order);
    }
    async findById(id) {
        const order = await this.prisma.order.findUnique({ where: { id } });
        if (!order) {
            return null;
        }
        return prisma_order_mapper_1.PrismaOrderMapper.toDomain(order);
    }
    async findByRecipientId(recipientId) {
        const order = await this.prisma.order.findFirst({
            where: { recipientId },
        });
        if (!order) {
            return null;
        }
        return prisma_order_mapper_1.PrismaOrderMapper.toDomain(order);
    }
    async fetchOrdersByRecipientId(recipientId, page) {
        const orders = await this.prisma.order.findMany({
            where: { recipientId },
            skip: page * 10,
            take: 10,
        });
        return orders.map(prisma_order_mapper_1.PrismaOrderMapper.toDomain);
    }
    async fetchOrderByDeliveryManId({ deliveryManId, page, perPage, }) {
        const orders = await this.prisma.order.findMany({
            where: {
                deliveryManId,
            },
            orderBy: {
                createdAt: 'desc',
            },
            skip: (page - 1) * perPage,
            take: perPage,
        });
        return orders.map(prisma_order_mapper_1.PrismaOrderMapper.toDomain);
    }
    async fetchManyNearby(coordinate) {
        const orders = await this.prisma.order.findMany({
            include: {
                address: true,
            },
        });
        const orderWithDistances = await Promise.all(orders.map(async (order) => {
            const distance = (0, get_distance_between_coordinate_1.getDistanceBetweenCoordinates)({
                latitude: Number(coordinate.latitude),
                longitude: Number(coordinate.longitude),
            }, {
                latitude: Number(order.address.latitude),
                longitude: Number(order.address.longitude),
            });
            return {
                order,
                distance,
            };
        }));
        const nearbyOrders = orderWithDistances.sort((orderA, orderB) => {
            return orderA.distance - orderB.distance;
        });
        return nearbyOrders.map((orderWithDistance) => prisma_order_mapper_1.PrismaOrderMapper.toDomain(orderWithDistance.order));
    }
    async fetchManyNearbyWithDistance(coordinate) {
        const orders = await this.prisma.order.findMany({
            include: {
                address: true,
            },
        });
        const orderWithDistances = await Promise.all(orders.map(async (order) => {
            const distance = (0, get_distance_between_coordinate_1.getDistanceBetweenCoordinates)({
                latitude: Number(coordinate.latitude),
                longitude: Number(coordinate.longitude),
            }, {
                latitude: Number(order.address.latitude),
                longitude: Number(order.address.longitude),
            });
            return {
                order,
                distance,
            };
        }));
        const nearbyOrders = orderWithDistances.sort((orderA, orderB) => {
            return orderA.distance - orderB.distance;
        });
        return nearbyOrders.map((orderWithDistance) => {
            const order = prisma_order_mapper_1.PrismaOrderMapper.toDomain(orderWithDistance.order);
            return order_with_distance_1.OrderWithDistance.create({
                order,
                distanceInKms: orderWithDistance.distance,
            });
        });
    }
    async deleteManyByRecipientId(recipientId) {
        await this.prisma.order.deleteMany({ where: { recipientId } });
    }
    async save(order) {
        const data = prisma_order_mapper_1.PrismaOrderMapper.toPrisma(order);
        switch (data.orderStatus) {
            case order_status_enum_1.ORDER_STATUS.PENDING:
                await domain_events_1.DomainEvents.dispatchEventsForAggregate(order.id);
                break;
            case 'withdrawn':
                await domain_events_1.DomainEvents.dispatchEventsForAggregate(order.id);
                break;
            case order_status_enum_1.ORDER_STATUS.DELIVERED:
                await domain_events_1.DomainEvents.dispatchEventsForAggregate(order.id);
                break;
            case 'canceled':
                await domain_events_1.DomainEvents.dispatchEventsForAggregate(order.id);
                break;
        }
        await this.prisma.order.update({
            where: { id: data.id },
            data,
        });
    }
    async delete(order) {
        await this.prisma.order.delete({ where: { id: order.id.toValue() } });
    }
    async fetchRecentOrder({ page, perPage, }) {
        const orders = await this.prisma.order.findMany({
            skip: (page - 1) * perPage,
            take: perPage,
            orderBy: {
                createdAt: 'desc',
            },
        });
        return orders.map(prisma_order_mapper_1.PrismaOrderMapper.toDomain);
    }
    async exists(id) {
        const order = await this.findById(id);
        return !!order;
    }
};
exports.PrismaOrdersRepository = PrismaOrdersRepository;
exports.PrismaOrdersRepository = PrismaOrdersRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaOrdersRepository);
//# sourceMappingURL=prisma-orders-repository.js.map