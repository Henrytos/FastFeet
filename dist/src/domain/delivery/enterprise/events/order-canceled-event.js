"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderCanceledEvent = void 0;
class OrderCanceledEvent {
    constructor(order) {
        this.order = order;
        this.ocurredAt = new Date();
    }
    getAggregateId() {
        return this.order.id;
    }
}
exports.OrderCanceledEvent = OrderCanceledEvent;
//# sourceMappingURL=order-canceled-event.js.map