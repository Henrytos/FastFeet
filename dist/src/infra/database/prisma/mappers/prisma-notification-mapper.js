"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaNotificationMapper = void 0;
const notification_1 = require("../../../../domain/notification/enterprise/entities/notification");
const unique_entity_id_1 = require("../../../../core/entities/unique-entity-id");
class PrismaNotificationMapper {
    static toDomain(raw) {
        return notification_1.Notification.create({
            recipientId: new unique_entity_id_1.UniqueEntityID(raw.recipientId),
            title: raw.title,
            content: raw.content,
            createdAt: raw.createdAt,
            readAt: raw.readAt,
        }, new unique_entity_id_1.UniqueEntityID(raw.id));
    }
    static toPrisma(notification) {
        return {
            id: notification.id.toString(),
            recipientId: notification.recipientId.toString(),
            content: notification.content,
            title: notification.title,
            createdAt: notification.createdAt,
            readAt: notification.readAt ?? null,
        };
    }
}
exports.PrismaNotificationMapper = PrismaNotificationMapper;
//# sourceMappingURL=prisma-notification-mapper.js.map