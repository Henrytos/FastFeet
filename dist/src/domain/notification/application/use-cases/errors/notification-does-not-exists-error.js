"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationDoesNotExistsError = void 0;
class NotificationDoesNotExistsError extends Error {
    constructor() {
        super('Notification does not exists');
        this.name = 'NotificationDoesNotExistsError';
    }
}
exports.NotificationDoesNotExistsError = NotificationDoesNotExistsError;
//# sourceMappingURL=notification-does-not-exists-error.js.map