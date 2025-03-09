"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const aggregate_root_1 = require("../../../../core/entities/aggregate-root");
const order_created_event_1 = require("../events/order-created-event");
const order_make_delivered_event_1 = require("../events/order-make-delivered-event");
const order_withdrawn_event_1 = require("../events/order-withdrawn-event");
const order_canceled_event_1 = require("../events/order-canceled-event");
const order_status_enum_1 = require("../../../../core/constants/order-status.enum");
class Order extends aggregate_root_1.AggregateRoot {
    get deliveryManId() {
        return this.props.deliveryManId;
    }
    set deliveryManId(deliveryManId) {
        this.props.deliveryManId = deliveryManId;
        this.touch();
    }
    get recipientId() {
        return this.props.recipientId;
    }
    get photoId() {
        return this.props.photoId;
    }
    set photoId(photoId) {
        this.props.photoId = photoId;
    }
    get deliveryAddressId() {
        return this.props.deliveryAddressId;
    }
    set deliveryAddressId(deliveryAddressId) {
        this.props.deliveryAddressId = deliveryAddressId;
    }
    get status() {
        return this.props.status;
    }
    set status(status) {
        switch (status) {
            case order_status_enum_1.ORDER_STATUS.PENDING:
                this.addDomainEvent(new order_created_event_1.OrderCreatedEvent(this));
                break;
            case order_status_enum_1.ORDER_STATUS.WITHDRAWN:
                this.withdrawnAt = new Date();
                this.addDomainEvent(new order_withdrawn_event_1.OrderWithdrawnEvent(this));
                break;
            case order_status_enum_1.ORDER_STATUS.DELIVERED:
                this.deliveryAt = new Date();
                this.addDomainEvent(new order_make_delivered_event_1.OrderMakeDeliveredEvent(this));
                break;
            case order_status_enum_1.ORDER_STATUS.CANCELED:
                this.addDomainEvent(new order_canceled_event_1.OrderCanceledEvent(this));
                break;
        }
        this.props.status = status;
        this.touch();
    }
    get createdAt() {
        return this.props.createdAt;
    }
    get updatedAt() {
        return this.props.updatedAt;
    }
    get deliveryAt() {
        return this.props.deliveryAt;
    }
    set deliveryAt(deliveryAt) {
        if (!this.withdrawnAt) {
            throw new Error('Order is already withdrawn');
        }
        if (this.withdrawnAt > deliveryAt) {
            throw new Error('Delivery date must be after withdrawn date');
        }
        this.props.deliveryAt = deliveryAt;
        this.touch();
    }
    get withdrawnAt() {
        return this.props.withdrawnAt;
    }
    set withdrawnAt(withdrawnAt) {
        this.props.withdrawnAt = withdrawnAt;
        this.touch();
    }
    touch() {
        this.props.updatedAt = new Date();
    }
    isValidForCanceled() {
        const invalidValues = [order_status_enum_1.ORDER_STATUS.CANCELED, order_status_enum_1.ORDER_STATUS.DELIVERED];
        if (invalidValues.includes(this.status)) {
            return false;
        }
        return true;
    }
    isValidForWithdrawn() {
        const invalidValues = [
            order_status_enum_1.ORDER_STATUS.WITHDRAWN,
            order_status_enum_1.ORDER_STATUS.CANCELED,
            order_status_enum_1.ORDER_STATUS.DELIVERED,
            order_status_enum_1.ORDER_STATUS.DELIVERED,
        ];
        if (invalidValues.includes(this.status)) {
            return false;
        }
        return true;
    }
    isValidForDelivered() {
        const invalidValues = [
            order_status_enum_1.ORDER_STATUS.PENDING,
            order_status_enum_1.ORDER_STATUS.DELIVERED,
            order_status_enum_1.ORDER_STATUS.CANCELED,
        ];
        if (invalidValues.includes(this.status)) {
            return false;
        }
        return true;
    }
    static create(props, id) {
        const order = new Order({
            createdAt: new Date(),
            updatedAt: props.updatedAt ?? new Date(),
            status: order_status_enum_1.ORDER_STATUS.PENDING,
            ...props,
        }, id);
        if (!id) {
            order.addDomainEvent(new order_created_event_1.OrderCreatedEvent(order));
        }
        return order;
    }
}
exports.Order = Order;
//# sourceMappingURL=order.js.map