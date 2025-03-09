import { ORDER_STATUS } from '@/core/constants/order-status.enum'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { OrderWithDetails } from '@/domain/delivery/enterprise/entities/value-object/order-with-details'
import {
  Order as PrismaOrder,
  Address as PrismaAddress,
  Recipient as PrismaRecipient,
} from '@prisma/client'

type PrismaOrderWithDetails = PrismaOrder & {
  address: PrismaAddress
  recipient: PrismaRecipient
}

export class PrismaOrderWithDetailsMapper {
  static toDomain(raw: PrismaOrderWithDetails): OrderWithDetails {
    const orderWithDetails = OrderWithDetails.create({
      address: {
        addressId: new UniqueEntityID(raw.address.id),
        city: raw.address.city,
        neighborhood: raw.address.neighborhood,
        number: raw.address.number,
        state: raw.address.state,
        street: raw.address.street,
        zip: raw.address.zip,
      },
      order: {
        orderId: new UniqueEntityID(raw.id),
        createdAt: raw.createdAt,
        status: ORDER_STATUS[raw.orderStatus],
        deliveryAt: raw.deliveryAt,
        withdrawnAt: raw.withdrawnAt,
      },
      recipient: {
        recipientId: new UniqueEntityID(raw.recipient.id),
        name: raw.recipient.name,
      },
    })

    return orderWithDetails
  }
}
