import { Order } from '@/domain/delivery/enterprise/entities/order'

export class OrderPresenter {
  static toHTTP(order: Order) {
    return {
      id: order.id.toString(),
      deliveryManId: order.deliveryManId?.toString(),
      recipientId: order.recipientId.toString(),
      deliveryAddressId: order.deliveryAddressId?.toString(),
      status: order.status,
      deliveryAt: order.deliveryAt,
      withdrawnAt: order.withdrawnAt,
      photoId: order.photoId?.toString(),
      updatedAt: order.updatedAt,
      createdAt: order.createdAt,
    }
  }
}
