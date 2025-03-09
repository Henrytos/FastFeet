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
exports.SendNotificationUseCase = void 0;
const either_1 = require("../../../../core/either");
const notification_1 = require("../../enterprise/entities/notification");
const unique_entity_id_1 = require("../../../../core/entities/unique-entity-id");
const notifications_repository_1 = require("../repositories/notifications-repository");
const common_1 = require("@nestjs/common");
const send_email_1 = require("../email/send-email");
const recipients_repository_1 = require("../../../delivery/application/repositories/recipients-repository");
const recipient_does_not_exist_error_1 = require("../../../delivery/application/use-cases/errors/recipient-does-not-exist-error");
let SendNotificationUseCase = class SendNotificationUseCase {
    constructor(notificationsRepository, recipientsRepository, sendEmailToUser) {
        this.notificationsRepository = notificationsRepository;
        this.recipientsRepository = recipientsRepository;
        this.sendEmailToUser = sendEmailToUser;
    }
    async execute({ recipientId, title, content, }) {
        const notification = notification_1.Notification.create({
            recipientId: new unique_entity_id_1.UniqueEntityID(recipientId),
            title,
            content,
        });
        await this.notificationsRepository.create(notification);
        const recipient = await this.recipientsRepository.findById(recipientId);
        if (!recipient) {
            return (0, either_1.left)(new recipient_does_not_exist_error_1.RecipientDoesNotExistError());
        }
        await this.sendEmailToUser.send({
            to: {
                email: recipient.email,
                subject: notification.title,
                body: notification.content,
            },
        });
        return (0, either_1.right)({ notification });
    }
};
exports.SendNotificationUseCase = SendNotificationUseCase;
exports.SendNotificationUseCase = SendNotificationUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [notifications_repository_1.NotificationsRepository,
        recipients_repository_1.RecipientsRepository,
        send_email_1.SendEmailToUser])
], SendNotificationUseCase);
//# sourceMappingURL=send-notification-use-case.js.map