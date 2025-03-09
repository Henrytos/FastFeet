"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaOrderMapper = void 0;
const order_1 = require("../../../../domain/delivery/enterprise/entities/order");
const unique_entity_id_1 = require("../../../../core/entities/unique-entity-id");
const order_status_enum_1 = require("../../../../core/constants/order-status.enum");
class PrismaOrderMapper {
    static toDomain(raw) {
        return order_1.Order.create({
            status: order_status_enum_1.ORDER_STATUS[raw.orderStatus.toLocaleUpperCase()],
            recipientId: raw.recipientId
                ? new unique_entity_id_1.UniqueEntityID(raw.recipientId)
                : null,
            photoId: raw.photoId ? new unique_entity_id_1.UniqueEntityID(raw.photoId) : null,
            deliveryAddressId: raw.deliveryAddressId
                ? new unique_entity_id_1.UniqueEntityID(raw.deliveryAddressId)
                : null,
            deliveryManId: raw.deliveryManId
                ? new unique_entity_id_1.UniqueEntityID(raw.deliveryManId)
                : null,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
            deliveryAt: raw.deliveryAt,
            withdrawnAt: raw.withdrawnAt,
        }, new unique_entity_id_1.UniqueEntityID(raw.id));
    }
    static toPrisma(order) {
        return {
            id: order.id.toString(),
            deliveryAddressId: order.deliveryAddressId
                ? order.deliveryAddressId.toString()
                : null,
            recipientId: order.recipientId ? order.recipientId.toString() : null,
            deliveryManId: order.deliveryManId
                ? order.deliveryManId.toString()
                : null,
            photoId: order.photoId ? order.photoId.toString() : null,
            orderStatus: order.status,
            withdrawnAt: order.withdrawnAt,
            deliveryAt: order.deliveryAt,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
        };
    }
}
exports.PrismaOrderMapper = PrismaOrderMapper;
//# sourceMappingURL=prisma-order-mapper.js.map