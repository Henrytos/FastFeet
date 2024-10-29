import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { DomainEvent } from "@/core/events/domain-event";
import { Order } from "../entities/order";

export class OrderMakeDeliveredEvent implements DomainEvent {
  public ocurredAt: Date;
  public order: Order;

  constructor(order: Order) {
    this.ocurredAt = new Date();
    this.order = order;
  }

  getAggregateId(): UniqueEntityID {
    throw new Error("Method not implemented.");
  }
}
