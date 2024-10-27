import { OrderStatus, Prisma, Order as PrismaOrder } from '@prisma/client';
import { Order } from '@/domain/delivery/enterprise/entities/order';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { ORDER_STATUS } from '@/core/entities/order-status.enum';

export class PrismaOrderMapper {
  static toDomain(raw: PrismaOrder): Order {
    return Order.create(
      {
        status: ORDER_STATUS[raw.orderStatus],
        recipientId: new UniqueEntityID(raw.recipientId),
        photoId: new UniqueEntityID(raw.photoId),
        deliveryAddressId: new UniqueEntityID(raw.addressId),
        deliveryManId: new UniqueEntityID(raw.deliveryManId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        deliveryAt: raw.deliveryAt,
        withdrawnAt: raw.withdrawnAt,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(order: Order): Prisma.OrderUncheckedCreateInput {
    return {
      id: order.id.toValue(),
      addressId: order.deliveryAddressId.toValue(),
      recipientId: order.recipientId.toValue(),
      deliveryManId: order.deliveryManId.toValue(),
      photoId: order.photoId.toValue(),
      orderStatus: order.status,
      withdrawnAt: order.withdrawnAt,
      deliveryAt: order.deliveryAt,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };
  }
}
