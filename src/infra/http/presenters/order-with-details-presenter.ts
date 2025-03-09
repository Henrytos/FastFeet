import { OrderWithDetails } from '@/domain/delivery/enterprise/entities/value-object/order-with-details'

export class OrderWithDetailsPresenter {
  static toHTTP(orderWithDetails: OrderWithDetails) {
    return {
      address: {
        addressId: orderWithDetails.address.addressId.toString(),
        city: orderWithDetails.address.city,
        neighborhood: orderWithDetails.address.neighborhood,
        number: orderWithDetails.address.number,
        state: orderWithDetails.address.state,
        street: orderWithDetails.address.street,
        zip: orderWithDetails.address.zip,
      },
      order: {
        orderId: orderWithDetails.order.orderId.toString(),
        createdAt: orderWithDetails.order.createdAt,
        status: orderWithDetails.order.status,
        deliveryAt: orderWithDetails.order.deliveryAt,
        withdrawnAt: orderWithDetails.order.withdrawnAt,
      },
      recipient: {
        recipientId: orderWithDetails.recipient.recipientId.toString(),
        name: orderWithDetails.recipient.name,
      },
    }
  }
}
