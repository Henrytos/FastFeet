import { Order } from '@/domain/delivery/enterprise/entities/order'

export class OrderPresenter {
  static toHTTP(order: Order) {
    return {
      deliveryManId: order.deliveryManId
        ? order.deliveryManId?.toString()
        : null,
      recipientId: order.recipientId ? order.recipientId?.toString() : null,
      deliveryAddressId: order.deliveryAddressId
        ? order.deliveryAddressId?.toString()
        : null,
      photoId: order.photoId ? order.photoId?.toString() : null,
      status: order.status,
      deliveryAt: order.deliveryAt,
      withdrawnAt: order.withdrawnAt,
      updatedAt: order.updatedAt,
      createdAt: order.createdAt,
    }
  }
}
