import { AggregateRoot } from "@/core/entities/aggregate-root";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";
import { OrderCreatedEvent } from "../events/order-created-event";
import { OrderMakeDeliveredEvent } from "../events/order-make-delivered-event";
import { DomainEvents } from "@/core/events/domain-events";
import { OrderWithdrawnEvent } from "../events/order-withdrawn-event";
import { OrderCanceledEvent } from "../events/order-canceled-event";

export interface OrderProps {
  deliviryManId?: UniqueEntityID;
  recipientId: UniqueEntityID;
  deliviryAddressId?: UniqueEntityID;
  status: "pending" | "delivered" | "withdrawn" | "canceled";
  createdAt: Date;
  updatedAt?: Date | null;
  deliveryAt?: Date | null;
  withdrawnAt?: Date | null;
  photoIds?: UniqueEntityID[];
}

export class Order extends AggregateRoot<OrderProps> {
  get deliviryManId(): UniqueEntityID | undefined {
    return this.props.deliviryManId;
  }

  set deliviryManId(deliviryManId: UniqueEntityID) {
    this.props.deliviryManId = deliviryManId;
    this.touch();
  }

  get recipientId() {
    return this.props.recipientId;
  }
  get photoIds(): UniqueEntityID[] | null | undefined {
    return this.props.photoIds;
  }

  set photoIds(photoIds: UniqueEntityID[]) {
    this.props.photoIds = photoIds;
  }

  get deliveryAddressId(): UniqueEntityID | undefined {
    return this.props.deliviryAddressId;
  }

  set deliveryAddressId(deliveryAddressId: UniqueEntityID) {
    this.props.deliviryAddressId = deliveryAddressId;
  }

  get status() {
    return this.props.status;
  }

  set status(status: "pending" | "withdrawn" | "delivered" | "canceled") {
    switch (status) {
      case "pending":
        this.addDomainEvent(new OrderCreatedEvent(this));
        break;
      case "delivered":
        this.addDomainEvent(new OrderMakeDeliveredEvent(this));
        break;
      case "withdrawn":
        this.addDomainEvent(new OrderWithdrawnEvent(this));
        break;
      case "canceled":
        this.addDomainEvent(new OrderCanceledEvent(this));
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

  get deliveryAt(): Date | null | undefined {
    return this.props.deliveryAt;
  }

  set deliveryAt(deliveryAt: Date) {
    if (!this.withdrawnAt) {
      throw new Error("Order is already withdrawn");
    }
    if (this.withdrawnAt > deliveryAt) {
      throw new Error("Delivery date must be after withdrawn date");
    }
    this.props.deliveryAt = deliveryAt;

    this.touch();
  }

  get withdrawnAt(): Date | undefined | null {
    return this.props.withdrawnAt;
  }

  set withdrawnAt(withdrawnAt: Date) {
    this.props.withdrawnAt = withdrawnAt;
    this.touch();
  }

  touch() {
    this.props.updatedAt = new Date();
  }

  static create(props: Optional<OrderProps, "createdAt">, id?: UniqueEntityID) {
    const order = new Order(
      {
        createdAt: new Date(),
        updatedAt: props.updatedAt ?? new Date(),

        ...props,
      },
      id
    );

    order.addDomainEvent(new OrderCreatedEvent(order));

    return order;
  }
}
