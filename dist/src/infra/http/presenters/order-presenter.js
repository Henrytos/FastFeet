"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderPresenter = void 0;
class OrderPresenter {
    static toHTTP(order) {
        return {
            id: order.id.toString(),
            deliveryManId: order.deliveryManId
                ? order.deliveryManId?.toString()
                : null,
            recipientId: order.recipientId ? order.recipientId?.toString() : null,
            deliveryAddressId: order.deliveryAddressId
                ? order.deliveryAddressId?.toString()
                : null,
            photoId: order.photoId ? order.photoId?.toString() : null,
            status: order.status,
            deliveryAt: order.deliveryAt,
            withdrawnAt: order.withdrawnAt,
            updatedAt: order.updatedAt,
            createdAt: order.createdAt,
        };
    }
}
exports.OrderPresenter = OrderPresenter;
//# sourceMappingURL=order-presenter.js.map