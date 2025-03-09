"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
const entity_1 = require("../../../../core/entities/entity");
class Notification extends entity_1.Entity {
    get title() {
        return this.props.title;
    }
    get content() {
        return this.props.content;
    }
    get recipientId() {
        return this.props.recipientId;
    }
    get createdAt() {
        return this.props.createdAt;
    }
    get readAt() {
        return this.props.readAt;
    }
    read() {
        this.props.readAt = new Date();
    }
    static create(props, id) {
        const notification = new Notification({
            createdAt: props.createdAt ?? new Date(),
            ...props,
        }, id);
        return notification;
    }
}
exports.Notification = Notification;
//# sourceMappingURL=notification.js.map