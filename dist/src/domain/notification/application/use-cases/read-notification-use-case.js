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
exports.ReadNotificationUseCase = void 0;
const either_1 = require("../../../../core/either");
const notifications_repository_1 = require("../repositories/notifications-repository");
const notification_does_not_exists_error_1 = require("./errors/notification-does-not-exists-error");
const wrong_credentials_error_1 = require("../../../delivery/application/use-cases/errors/wrong-credentials-error");
const common_1 = require("@nestjs/common");
let ReadNotificationUseCase = class ReadNotificationUseCase {
    constructor(notificationsRepository) {
        this.notificationsRepository = notificationsRepository;
    }
    async execute({ notificationId, recipientId, }) {
        const notification = await this.notificationsRepository.findById(notificationId);
        if (!notification) {
            return (0, either_1.left)(new notification_does_not_exists_error_1.NotificationDoesNotExistsError());
        }
        if (notification.recipientId.toString() !== recipientId) {
            return (0, either_1.left)(new wrong_credentials_error_1.WrongCredentialsError());
        }
        notification.read();
        await this.notificationsRepository.save(notification);
        return (0, either_1.right)({ notification });
    }
};
exports.ReadNotificationUseCase = ReadNotificationUseCase;
exports.ReadNotificationUseCase = ReadNotificationUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [notifications_repository_1.NotificationsRepository])
], ReadNotificationUseCase);
//# sourceMappingURL=read-notification-use-case.js.map