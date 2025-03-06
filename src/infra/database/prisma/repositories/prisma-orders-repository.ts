import { OrdersRepository } from '@/domain/delivery/application/repositories/orders-repository'
import { Order } from '@/domain/delivery/enterprise/entities/order'
import {
  Coordinate,
  getDistanceBetweenCoordinates,
} from '@/test/utils/get-distance-between-coordinate'
import { PrismaOrderMapper } from '../mappers/prisma-order-mapper'
import { PrismaService } from '../prisma.service'
import { Injectable } from '@nestjs/common'
import { OrderWithDetails } from '@/domain/delivery/enterprise/entities/value-object/order-with-details'
import { PrismaOrderWithDetailsMapper } from '../mappers/prisma-order-with-details'
import { OrderWithDistance } from '@/domain/delivery/enterprise/entities/value-object/order-with-distance'
import { ORDER_STATUS } from '@/core/constants/order-status.enum'
import { DomainEvents } from '@/core/events/domain-events'

@Injectable()
export class PrismaOrdersRepository implements OrdersRepository {
  constructor(private prisma: PrismaService) {}

  async create(order: Order): Promise<void> {
    const data = PrismaOrderMapper.toPrisma(order)
    await DomainEvents.dispatchEventsForAggregate(order.id)
    await this.prisma.order.create({ data })
  }

  async findByIdWithDetails(id: string): Promise<OrderWithDetails | null> {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        address: true,
        recipient: true,
        deliveryMan: true,
      },
    })

    if (!order) {
      return null
    }

    return PrismaOrderWithDetailsMapper.toDomain(order)
  }

  async findById(id: string): Promise<Order | null> {
    const order = await this.prisma.order.findUnique({ where: { id } })
    if (!order) {
      return null
    }
    return PrismaOrderMapper.toDomain(order)
  }

  async findByRecipientId(recipientId: string): Promise<Order | null> {
    const order = await this.prisma.order.findFirst({
      where: { recipientId },
    })

    if (!order) {
      return null
    }

    return PrismaOrderMapper.toDomain(order)
  }

  async fetchOrdersByRecipientId(
    recipientId: string,
    page: number,
  ): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      where: { recipientId },
      skip: page * 10,
      take: 10,
    })

    return orders.map(PrismaOrderMapper.toDomain)
  }

  async fetchOrderByDeliveryManId({
    deliveryManId,
    page,
    perPage,
  }: {
    deliveryManId: string
    page: number
    perPage: number
  }): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      where: {
        deliveryManId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: (page - 1) * perPage,
      take: perPage,
    })

    return orders.map(PrismaOrderMapper.toDomain)
  }

  async fetchManyNearby(coordinate: Coordinate): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      include: {
        address: true,
      },
    })

    const orderWithDistances = await Promise.all(
      orders.map(async (order) => {
        const distance = getDistanceBetweenCoordinates(
          {
            latitude: Number(coordinate.latitude),
            longitude: Number(coordinate.longitude),
          },
          {
            latitude: Number(order.address.latitude),
            longitude: Number(order.address.longitude),
          },
        )
        return {
          order,
          distance,
        }
      }),
    )

    const nearbyOrders = orderWithDistances.sort((orderA, orderB) => {
      return orderA.distance - orderB.distance
    })

    return nearbyOrders.map((orderWithDistance) =>
      PrismaOrderMapper.toDomain(orderWithDistance.order),
    )
  }

  async fetchManyNearbyWithDistance(
    coordinate: Coordinate,
  ): Promise<OrderWithDistance[]> {
    const orders = await this.prisma.order.findMany({
      include: {
        address: true,
      },
    })

    const orderWithDistances = await Promise.all(
      orders.map(async (order) => {
        const distance = getDistanceBetweenCoordinates(
          {
            latitude: Number(coordinate.latitude),
            longitude: Number(coordinate.longitude),
          },
          {
            latitude: Number(order.address.latitude),
            longitude: Number(order.address.longitude),
          },
        )
        return {
          order,
          distance,
        }
      }),
    )

    const nearbyOrders = orderWithDistances.sort((orderA, orderB) => {
      return orderA.distance - orderB.distance
    })

    return nearbyOrders.map((orderWithDistance) => {
      const order = PrismaOrderMapper.toDomain(orderWithDistance.order)

      return OrderWithDistance.create({
        order,
        distanceInKms: orderWithDistance.distance,
      })
    })
  }

  async deleteManyByRecipientId(recipientId: string): Promise<void> {
    await this.prisma.order.deleteMany({ where: { recipientId } })
  }

  async save(order: Order): Promise<void> {
    const data = PrismaOrderMapper.toPrisma(order)

    switch (data.orderStatus) {
      case ORDER_STATUS.PENDING:
        await DomainEvents.dispatchEventsForAggregate(order.id)
        break
      case 'withdrawn':
        await DomainEvents.dispatchEventsForAggregate(order.id)
        break
      case ORDER_STATUS.DELIVERED:
        await DomainEvents.dispatchEventsForAggregate(order.id)
        break
      case 'canceled':
        await DomainEvents.dispatchEventsForAggregate(order.id)
        break
    }

    await this.prisma.order.update({
      where: { id: data.id },
      data,
    })
  }

  async delete(order: Order): Promise<void> {
    await this.prisma.order.delete({ where: { id: order.id.toValue() } })
  }

  async fetchRecentOrder({
    page,
    perPage,
  }: {
    page: number
    perPage: number
  }): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      skip: (page - 1) * perPage,
      take: perPage,
      orderBy: {
        createdAt: 'desc',
      },
    })

    return orders.map(PrismaOrderMapper.toDomain)
  }

  async exists(id: string): Promise<boolean> {
    const order = await this.findById(id)
    return !!order
  }
}
