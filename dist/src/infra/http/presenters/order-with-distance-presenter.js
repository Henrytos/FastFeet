"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderWithDistancePresenter = void 0;
const order_presenter_1 = require("./order-presenter");
class OrderWithDistancePresenter {
    static toHTTP(orderWithDistance) {
        return {
            distanceInKms: orderWithDistance.distanceInKms,
            ...order_presenter_1.OrderPresenter.toHTTP(orderWithDistance.order),
        };
    }
}
exports.OrderWithDistancePresenter = OrderWithDistancePresenter;
//# sourceMappingURL=order-with-distance-presenter.js.map