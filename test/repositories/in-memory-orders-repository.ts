import { DomainEvents } from '@/core/events/domain-events'
import { OrdersRepository } from '@/domain/delivery/application/repositories/orders-repository'
import { Order } from '@/domain/delivery/enterprise/entities/order'
import {
  Coordinate,
  getDistanceBetweenCoordinates,
} from '../utils/get-distance-between-coordinate'
import { ORDER_STATUS } from '@/core/constants/order-status.enum'
import { OrderWithDetails } from '@/domain/delivery/enterprise/entities/value-object/order-with-details'
import { InMemoryDeliveryAddressRepository } from './in-memory-delivery-address-repository'
import { InMemoryRecipientsRepository } from './in-memory-recipients-repository'
import { OrderWithDistance } from '@/domain/delivery/enterprise/entities/value-object/order-with-distance'
export class InMemoryOrdersRepository implements OrdersRepository {
  public items: Order[] = []

  constructor(
    private readonly deliveryAddressRepository: InMemoryDeliveryAddressRepository,
    private recipientsRepository: InMemoryRecipientsRepository,
  ) {}

  async create(order: Order): Promise<void> {
    this.items.push(order)

    switch (order.status) {
      case ORDER_STATUS.PENDING:
        DomainEvents.dispatchEventsForAggregate(order.id)
        break
    }
  }

  async findByIdWithDetails(id: string): Promise<OrderWithDetails | null> {
    const order = await this.items.find((item) => item.id.toString() === id)
    if (!order) {
      return null
    }

    const deliveryAddress = await this.deliveryAddressRepository.findById(
      order.deliveryAddressId.toString(),
    )
    if (!deliveryAddress) {
      return null
    }

    const recipient = await this.recipientsRepository.findById(
      order.recipientId.toString(),
    )
    if (!recipient) {
      return null
    }

    const orderWithDetails = OrderWithDetails.create({
      address: {
        addressId: order.deliveryAddressId,
        city: deliveryAddress.city,
        neighborhood: deliveryAddress.neighborhood,
        number: deliveryAddress.number,
        state: deliveryAddress.state,
        street: deliveryAddress.street,
        zip: deliveryAddress.zip,
      },
      order: {
        orderId: order.id,
        createdAt: order.createdAt,
        status: order.status,
        deliveryAt: order.deliveryAt,
        withdrawnAt: order.withdrawnAt,
      },
      recipient: {
        recipientId: order.recipientId,
        name: recipient.name,
      },
    })

    return orderWithDetails
  }

  async findById(id: string): Promise<Order | null> {
    const order = this.items.find((item) => {
      return item.id.toString() === id
    })

    if (!order) {
      return null
    }

    return order
  }

  async save(order: Order): Promise<void> {
    const index = this.items.findIndex((item) => {
      return item.id.toValue() === order.id.toValue()
    })

    this.items[index] = order

    switch (order.status) {
      case ORDER_STATUS.PENDING:
        DomainEvents.dispatchEventsForAggregate(order.id)
        break
      case 'withdrawn':
        DomainEvents.dispatchEventsForAggregate(order.id)
        break
      case ORDER_STATUS.DELIVERED:
        DomainEvents.dispatchEventsForAggregate(order.id)
        break
      case 'canceled':
        DomainEvents.dispatchEventsForAggregate(order.id)

        break
    }
  }

  async delete(order: Order) {
    const orderDoesExists = !this.findById(order.id.toString())
    if (orderDoesExists) {
      throw new Error('Order does not exist')
    }

    const index = this.items.findIndex((item) => {
      return item.id.toValue() === order.id.toValue()
    })

    this.items.splice(index, 1)
  }

  async fetchOrdersByRecipientId(
    recipientId: string,
    page: number,
  ): Promise<Order[]> {
    const orders = this.items
      .filter((item) => {
        return item.recipientId.toString() === recipientId
      })
      .slice((page - 1) * 20, (page - 1) * 20 + 20)

    return orders
  }

  async deleteManyByRecipientId(recipientId: string): Promise<void> {
    const ordersFiltered = this.items.filter((item) => {
      return item.recipientId.toString() !== recipientId
    })

    this.items = ordersFiltered
  }

  async findByRecipientId(recipientId: string): Promise<Order | null> {
    const order = this.items.find((item) => {
      return item.recipientId.toString() === recipientId
    })

    if (!order) {
      return null
    }

    return order
  }

  async fetchManyNearby(
    { latitude, longitude }: Coordinate,
    page: number,
  ): Promise<Order[]> {
    const distances = await Promise.all(
      this.items.map(async (order) => {
        const deliveryAddress = await this.deliveryAddressRepository.findById(
          order.deliveryAddressId.toString(),
        )
        const distance = getDistanceBetweenCoordinates(
          { latitude, longitude },
          {
            latitude: deliveryAddress.latitude,
            longitude: deliveryAddress.longitude,
          },
        )
        return { order, distance }
      }),
    )

    const orders = distances
      .sort((a, b) => a.distance - b.distance)
      .map((item) => item.order)

    const ordersPaginated = orders.slice((page - 1) * 20, (page - 1) * 20 + 20)
    return ordersPaginated
  }

  async fetchManyNearbyWithDistance(
    { latitude, longitude }: Coordinate,
    page: number,
  ): Promise<OrderWithDistance[]> {
    const distances = await Promise.all(
      this.items.map(async (order) => {
        const deliveryAddress = await this.deliveryAddressRepository.findById(
          order.deliveryAddressId.toString(),
        )
        const distance = getDistanceBetweenCoordinates(
          { latitude, longitude },
          {
            latitude: deliveryAddress.latitude,
            longitude: deliveryAddress.longitude,
          },
        )
        return { order, distance }
      }),
    )

    const orders = distances
      .sort((a, b) => a.distance - b.distance)
      .map((item) => {
        return {
          order: item.order,
          distance: item.distance,
        }
      })

    const ordersPaginated = orders.slice((page - 1) * 20, (page - 1) * 20 + 20)

    const ordersWithDistances = ordersPaginated.map((item) => {
      return OrderWithDistance.create({
        distanceInKms: item.distance,
        order: item.order,
      })
    })

    return ordersWithDistances
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
    const orders = this.items
      .filter((order) => {
        return order.deliveryManId?.toValue() === deliveryManId
      })
      .slice((page - 1) * perPage, (page - 1) * perPage + perPage)

    return orders
  }

  async fetchRecentOrder({
    page,
    perPage,
  }: {
    page: number
    perPage: number
  }): Promise<Order[]> {
    const orders = this.items
      .sort((orderA, orderB) => {
        if (orderA.createdAt > orderB.createdAt) {
          return -1
        }
        if (orderA.createdAt < orderB.createdAt) {
          return 1
        }
        return 0
      })
      .slice((page - 1) * perPage, perPage * page)

    return orders
  }

  async exists(id: string): Promise<boolean> {
    const orderDoesExists: boolean = this.items.some(
      (item) => item.id.toString() === id,
    )

    return orderDoesExists
  }
}
