"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderCreatedEvent = void 0;
class OrderCreatedEvent {
    constructor(order) {
        this.order = order;
        this.ocurredAt = new Date();
    }
    getAggregateId() {
        return this.order.id;
    }
}
exports.OrderCreatedEvent = OrderCreatedEvent;
//# sourceMappingURL=order-created-event.js.map