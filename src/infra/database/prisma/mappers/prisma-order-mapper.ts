import { Prisma, Order as PrismaOrder } from '@prisma/client'
import { Order } from '@/domain/delivery/enterprise/entities/order'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ORDER_STATUS } from '@/core/entities/order-status.enum'

export class PrismaOrderMapper {
  static toDomain(raw: PrismaOrder): Order {
    return Order.create(
      {
        status: ORDER_STATUS[raw.orderStatus.toLocaleUpperCase()],
        recipientId: raw.recipientId
          ? new UniqueEntityID(raw.recipientId)
          : null,
        photoId: raw.photoId ? new UniqueEntityID(raw.photoId) : null,
        deliveryAddressId: raw.deliveryAddressId
          ? new UniqueEntityID(raw.deliveryAddressId)
          : null,
        deliveryManId: raw.deliveryManId
          ? new UniqueEntityID(raw.deliveryManId)
          : null,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        deliveryAt: raw.deliveryAt,
        withdrawnAt: raw.withdrawnAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(order: Order): Prisma.OrderUncheckedCreateInput {
    return {
      id: order.id.toString(),
      deliveryAddressId: order.deliveryAddressId
        ? order.deliveryAddressId.toString()
        : null,
      recipientId: order.recipientId ? order.recipientId.toString() : null,
      deliveryManId: order.deliveryManId
        ? order.deliveryManId.toString()
        : null,
      photoId: order.photoId ? order.photoId.toString() : null,
      orderStatus: order.status,
      withdrawnAt: order.withdrawnAt,
      deliveryAt: order.deliveryAt,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    }
  }
}
