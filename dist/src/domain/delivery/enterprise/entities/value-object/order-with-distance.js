"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderWithDistance = void 0;
const value_object_1 = require("../../../../../core/entities/value-object");
class OrderWithDistance extends value_object_1.ValueObject {
    static create(vo) {
        const orderWithDistance = new OrderWithDistance(vo);
        return orderWithDistance;
    }
    get distanceInKms() {
        return this.props.distanceInKms;
    }
    get order() {
        return this.props.order;
    }
}
exports.OrderWithDistance = OrderWithDistance;
//# sourceMappingURL=order-with-distance.js.map