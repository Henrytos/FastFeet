"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaRecipientMapper = void 0;
const unique_entity_id_1 = require("../../../../core/entities/unique-entity-id");
const recipient_1 = require("../../../../domain/delivery/enterprise/entities/recipient");
class PrismaRecipientMapper {
    static toDomain(raw) {
        return recipient_1.Recipient.create({
            email: raw.email,
            name: raw.name,
        }, new unique_entity_id_1.UniqueEntityID(raw.id));
    }
    static toPrisma(recipient) {
        return {
            id: recipient.id.toString(),
            email: recipient.email,
            name: recipient.name,
        };
    }
}
exports.PrismaRecipientMapper = PrismaRecipientMapper;
//# sourceMappingURL=prisma-recipient-mapper.js.map