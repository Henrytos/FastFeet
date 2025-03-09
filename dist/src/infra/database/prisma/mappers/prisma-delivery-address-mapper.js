"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaDeliveryAddressMapper = void 0;
const delivery_address_1 = require("../../../../domain/delivery/enterprise/entities/delivery-address");
const unique_entity_id_1 = require("../../../../core/entities/unique-entity-id");
class PrismaDeliveryAddressMapper {
    static toDomain(raw) {
        return delivery_address_1.DeliveryAddress.create({
            city: raw.city,
            latitude: Number(raw.latitude),
            longitude: Number(raw.longitude),
            neighborhood: raw.neighborhood,
            number: raw.number,
            state: raw.state,
            street: raw.street,
            zip: raw.zip,
        }, new unique_entity_id_1.UniqueEntityID(raw.id));
    }
    static toPrisma(deliveryAddress) {
        return {
            id: deliveryAddress.id.toValue(),
            city: deliveryAddress.city,
            latitude: String(deliveryAddress.latitude),
            longitude: String(deliveryAddress.longitude),
            neighborhood: deliveryAddress.neighborhood,
            number: deliveryAddress.number,
            state: deliveryAddress.state,
            street: deliveryAddress.street,
            zip: deliveryAddress.zip,
        };
    }
}
exports.PrismaDeliveryAddressMapper = PrismaDeliveryAddressMapper;
//# sourceMappingURL=prisma-delivery-address-mapper.js.map