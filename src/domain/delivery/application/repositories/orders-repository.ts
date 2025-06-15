import { Coordinate } from '@/test/utils/get-distance-between-coordinate'
import { Order } from '@/domain/delivery/enterprise/entities/order'
import { OrderWithDetails } from '../../enterprise/entities/value-object/order-with-details'
import { OrderWithDistance } from '../../enterprise/entities/value-object/order-with-distance'
import { MetricsOfWeek } from '../../enterprise/entities/value-object/metrics-of-week'

export abstract class OrdersRepository {
  abstract create(order: Order): Promise<void>
  abstract findById(id: string): Promise<Order | null>
  abstract findByIdWithDetails(id: string): Promise<OrderWithDetails | null>

  abstract findByRecipientId(id: string): Promise<Order | null>
  abstract fetchOrdersByRecipientId(
    recipientId: string,
    page: number,
  ): Promise<Order[]>

  abstract fetchManyNearby(
    coordinate: Coordinate,
    page: number,
  ): Promise<Order[]>

  abstract fetchManyNearbyWithDistance(
    coordinate: Coordinate,
    page: number,
  ): Promise<OrderWithDistance[]>

  abstract deleteManyByRecipientId(recipientId: string): Promise<void>
  abstract save(order: Order): Promise<void>
  abstract delete(order: Order): Promise<void>
  abstract fetchOrderByDeliveryManId({
    deliveryManId,
    page,
    perPage,
  }: {
    deliveryManId: string
    page: number
    perPage: number
  }): Promise<Order[]>

  abstract fetchRecentOrder({
    page,
    perPage,
  }: {
    page: number
    perPage: number
  }): Promise<Order[]>

  abstract exists(id: string): Promise<boolean>

  abstract getMetricsOfWeek(pastTargetWeek: number): Promise<MetricsOfWeek>
}
