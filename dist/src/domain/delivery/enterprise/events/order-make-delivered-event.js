"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderMakeDeliveredEvent = void 0;
class OrderMakeDeliveredEvent {
    constructor(order) {
        this.ocurredAt = new Date();
        this.order = order;
    }
    getAggregateId() {
        throw new Error('Method not implemented.');
    }
}
exports.OrderMakeDeliveredEvent = OrderMakeDeliveredEvent;
//# sourceMappingURL=order-make-delivered-event.js.map