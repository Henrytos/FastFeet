import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Order, OrderProps } from "@/domain/delivery/enterprise/entites/order";
import { randomUUID } from "crypto";

export function makeOrder(overwide?: Partial<OrderProps>, id?: UniqueEntityID) {
  const order = Order.create(
    {
      recipientId: new UniqueEntityID(randomUUID()),
      status: "pending",
      createdAt: new Date(),
      deliveryAt: null,
      deliviryManId: new UniqueEntityID(randomUUID()),
      photoIds: [],
      updatedAt: new Date(),
      withdrawnAt: null,
      ...overwide,
    },
    id
  );

  return order;
}