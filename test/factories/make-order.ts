import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Order, OrderProps } from '@/domain/delivery/enterprise/entities/order';
import { randomUUID } from 'crypto';

export function makeOrder(overwide?: Partial<OrderProps>, id?: UniqueEntityID) {
  const order = Order.create(
    {
      recipientId: new UniqueEntityID(randomUUID()),
      status: 'pending',
      createdAt: new Date(),
      deliveryAt: null,
      photoId: null,
      updatedAt: new Date(),
      withdrawnAt: null,
      ...overwide,
    },
    id,
  );

  return order;
}
