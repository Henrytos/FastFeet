import { ORDER_STATUS } from '@/core/entities/order-status.enum'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Order, OrderProps } from '@/domain/delivery/enterprise/entities/order'
import { PrismaOrderMapper } from '@/infra/database/prisma/mappers/prisma-order-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { randomUUID } from 'crypto'

export function makeOrder(overwide?: Partial<OrderProps>, id?: UniqueEntityID) {
  const order = Order.create(
    {
      recipientId: new UniqueEntityID(randomUUID()),
      status: ORDER_STATUS.PENDING,
      createdAt: new Date(),
      deliveryAt: null,
      photoId: null,
      updatedAt: new Date(),
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
    const order = makeOrder(overwide)

    const prismaOrder = await this.prisma.order.create({
      data: PrismaOrderMapper.toPrisma(order),
    })

    return prismaOrder
  }
}
