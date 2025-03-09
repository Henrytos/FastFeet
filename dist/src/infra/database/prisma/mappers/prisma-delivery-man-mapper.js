"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaDeliveryManMapper = void 0;
const unique_entity_id_1 = require("../../../../core/entities/unique-entity-id");
const delivery_man_1 = require("../../../../domain/delivery/enterprise/entities/delivery-man");
const cpf_1 = require("../../../../domain/delivery/enterprise/entities/value-object/cpf");
class PrismaDeliveryManMapper {
    static toDomain(raw) {
        return delivery_man_1.DeliveryMan.create({
            cpf: cpf_1.Cpf.create(raw.cpf),
            name: raw.name,
            password: raw.passwordHash,
        }, new unique_entity_id_1.UniqueEntityID(raw.id));
    }
    static toPrisma(deliveryMan) {
        return {
            id: deliveryMan.id.toString(),
            cpf: deliveryMan.cpf.value,
            name: deliveryMan.name,
            passwordHash: deliveryMan.password,
            role: 'DELIVERY_MAN',
        };
    }
}
exports.PrismaDeliveryManMapper = PrismaDeliveryManMapper;
//# sourceMappingURL=prisma-delivery-man-mapper.js.map