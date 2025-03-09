"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaAdministratorMapper = void 0;
const unique_entity_id_1 = require("../../../../core/entities/unique-entity-id");
const administrator_1 = require("../../../../domain/delivery/enterprise/entities/administrator");
const cpf_1 = require("../../../../domain/delivery/enterprise/entities/value-object/cpf");
class PrismaAdministratorMapper {
    static toDomain(raw) {
        return administrator_1.Administrator.create({
            cpf: cpf_1.Cpf.create(raw.cpf),
            name: raw.name,
            password: raw.passwordHash,
        }, new unique_entity_id_1.UniqueEntityID(raw.id));
    }
    static toPrisma(administrator) {
        return {
            id: administrator.id.toString(),
            cpf: administrator.cpf.value,
            name: administrator.name,
            passwordHash: administrator.password,
            role: 'ADMINISTRATOR',
        };
    }
}
exports.PrismaAdministratorMapper = PrismaAdministratorMapper;
//# sourceMappingURL=prisma-administrator-mapper.js.map