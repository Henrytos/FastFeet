"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderWithDetails = void 0;
const value_object_1 = require("../../../../../core/entities/value-object");
class OrderWithDetails extends value_object_1.ValueObject {
    static create(vo) {
        const orderWithDetails = new OrderWithDetails(vo);
        return orderWithDetails;
    }
    get order() {
        return this.props.order;
    }
    get recipient() {
        return this.props.recipient;
    }
    get address() {
        return this.props.address;
    }
}
exports.OrderWithDetails = OrderWithDetails;
//# sourceMappingURL=order-with-details.js.map