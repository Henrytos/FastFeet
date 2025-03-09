"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaOrderWithDetailsMapper = void 0;
const order_status_enum_1 = require("../../../../core/constants/order-status.enum");
const unique_entity_id_1 = require("../../../../core/entities/unique-entity-id");
const order_with_details_1 = require("../../../../domain/delivery/enterprise/entities/value-object/order-with-details");
class PrismaOrderWithDetailsMapper {
    static toDomain(raw) {
        const orderWithDetails = order_with_details_1.OrderWithDetails.create({
            address: {
                addressId: new unique_entity_id_1.UniqueEntityID(raw.address.id),
                city: raw.address.city,
                neighborhood: raw.address.neighborhood,
                number: raw.address.number,
                state: raw.address.state,
                street: raw.address.street,
                zip: raw.address.zip,
            },
            order: {
                orderId: new unique_entity_id_1.UniqueEntityID(raw.id),
                createdAt: raw.createdAt,
                status: order_status_enum_1.ORDER_STATUS[raw.orderStatus],
                deliveryAt: raw.deliveryAt,
                withdrawnAt: raw.withdrawnAt,
            },
            recipient: {
                recipientId: new unique_entity_id_1.UniqueEntityID(raw.recipient.id),
                name: raw.recipient.name,
            },
        });
        return orderWithDetails;
    }
}
exports.PrismaOrderWithDetailsMapper = PrismaOrderWithDetailsMapper;
//# sourceMappingURL=prisma-order-with-details.js.map