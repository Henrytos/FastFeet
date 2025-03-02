import { ValueObject } from '@/core/entities/value-object'
import { Order } from '../order'

interface OrderWithDistanceProps {
  distanceInKms: number
  order: Order
}

export class OrderWithDistance extends ValueObject<OrderWithDistanceProps> {
  public static create(vo: OrderWithDistanceProps) {
    const orderWithDistance = new OrderWithDistance(vo)

    return orderWithDistance
  }

  get distanceInKms(): number {
    return this.props.distanceInKms
  }

  get order(): Order {
    return this.props.order
  }
}
