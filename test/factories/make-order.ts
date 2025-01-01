import { ORDER_STATUS } from '@/core/entities/order-status.enum'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Order, OrderProps } from '@/domain/delivery/enterprise/entities/order'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { randomUUID } from 'crypto'

export function makeOrder(overwide?: Partial<OrderProps>, id?: UniqueEntityID) {
  const order = Order.create(
    {
      recipientId: new UniqueEntityID(randomUUID()),
      deliveryManId: new UniqueEntityID(randomUUID()),
      deliveryAddressId: new UniqueEntityID(randomUUID()),
      status: ORDER_STATUS.PENDING,
      createdAt: new Date(),
      photoId: new UniqueEntityID(randomUUID()),
      updatedAt: null,
      deliveryAt: null,
      withdrawnAt: null,
      ...overwide,
    },
    id,
  )

  return order
}

@Injectable()
export class OrderFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaOrder(overwide: Partial<OrderProps> = {}) {
    const prismaOrder = await this.prisma.order.create({
      data: {
        deliveryManId: overwide.deliveryManId
          ? overwide.deliveryManId.toString()
          : null,
        photoId: overwide.photoId ? overwide.photoId.toString() : null,
        deliveryAddressId: overwide.deliveryAddressId
          ? overwide.deliveryAddressId.toString()
          : null,
        recipientId: overwide.recipientId
          ? overwide.recipientId.toString()
          : null,
        orderStatus: overwide.status ? overwide.status : ORDER_STATUS.PENDING,
        createdAt: overwide.createdAt || new Date(),
        updatedAt: overwide.updatedAt,
        deliveryAt: overwide.deliveryAt,
        withdrawnAt: overwide.withdrawnAt,
      },
    })

    return prismaOrder
  }
}
