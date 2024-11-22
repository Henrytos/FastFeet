import { DomainEvents } from '@/core/events/domain-events'
import { OrdersRepository } from '@/domain/delivery/application/repositories/orders-repository'
import { Order } from '@/domain/delivery/enterprise/entities/order'
import {
  Coordinate,
  getDistanceBetweenCoordinates,
} from '../utils/get-distance-between-coordinate'
import { DeliveryAddressRepository } from '@/domain/delivery/application/repositories/delivery-address-repository'
import { ORDER_STATUS } from '@/core/entities/order-status.enum'
export class InMemoryOrdersRepository implements OrdersRepository {
  public items: Order[] = []

  constructor(
    private readonly deliveryAddressRepository: DeliveryAddressRepository,
  ) {}

  async create(order: Order): Promise<void> {
    this.items.push(order)

    switch (order.status) {
      case ORDER_STATUS.PENDING:
        DomainEvents.dispatchEventsForAggregate(order.id)
        break
    }
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
    const orders = this.items.filter(async (order) => {
      const deliveryAddress = await this.deliveryAddressRepository.findById(
        order.deliveryAddressId.toValue(),
      )
      const distance = getDistanceBetweenCoordinates(
        { latitude, longitude },
        {
          latitude: deliveryAddress.latitude,
          longitude: deliveryAddress.longitude,
        },
      )

      return distance <= 10 // 10;
    })

    const ordersPaginated = orders.slice((page - 1) * 20, (page - 1) * 20 + 20)
    return ordersPaginated
  }

  async fetchOrderByDeliveryManId(
    deliveryManId: string,
    page: number,
    perPage: number,
  ): Promise<Order[]> {
    const orders = this.items
      .filter((order) => {
        return order.deliveryManId?.toValue() === deliveryManId
      })
      .slice((page - 1) * perPage, (page - 1) * perPage + perPage)

    return orders
  }
}
