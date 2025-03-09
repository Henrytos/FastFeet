"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderWithdrawnEvent = void 0;
class OrderWithdrawnEvent {
    constructor(order) {
        this.order = order;
        this.ocurredAt = new Date();
    }
    getAggregateId() {
        return this.order.id;
    }
}
exports.OrderWithdrawnEvent = OrderWithdrawnEvent;
//# sourceMappingURL=order-withdrawn-event.js.map