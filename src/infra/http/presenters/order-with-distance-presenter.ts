import { OrderWithDistance } from '@/domain/delivery/enterprise/entities/value-object/order-with-distance'
import { OrderPresenter } from './order-presenter'

export class OrderWithDistancePresenter {
  static toHTTP(orderWithDistance: OrderWithDistance) {
    return {
      distanceInKms: orderWithDistance.distanceInKms,
      ...OrderPresenter.toHTTP(orderWithDistance.order),
    }
  }
}
