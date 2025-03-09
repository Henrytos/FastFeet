"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderWithDetailsPresenter = void 0;
class OrderWithDetailsPresenter {
    static toHTTP(orderWithDetails) {
        return {
            address: {
                addressId: orderWithDetails.address.addressId.toString(),
                city: orderWithDetails.address.city,
                neighborhood: orderWithDetails.address.neighborhood,
                number: orderWithDetails.address.number,
                state: orderWithDetails.address.state,
                street: orderWithDetails.address.street,
                zip: orderWithDetails.address.zip,
            },
            order: {
                orderId: orderWithDetails.order.orderId.toString(),
                createdAt: orderWithDetails.order.createdAt,
                status: orderWithDetails.order.status,
                deliveryAt: orderWithDetails.order.deliveryAt,
                withdrawnAt: orderWithDetails.order.withdrawnAt,
            },
            recipient: {
                recipientId: orderWithDetails.recipient.recipientId.toString(),
                name: orderWithDetails.recipient.name,
            },
        };
    }
}
exports.OrderWithDetailsPresenter = OrderWithDetailsPresenter;
//# sourceMappingURL=order-with-details-presenter.js.map