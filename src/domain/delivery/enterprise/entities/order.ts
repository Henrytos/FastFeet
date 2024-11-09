import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { OrderCreatedEvent } from '../events/order-created-event'
import { OrderMakeDeliveredEvent } from '../events/order-make-delivered-event'
import { OrderWithdrawnEvent } from '../events/order-withdrawn-event'
import { OrderCanceledEvent } from '../events/order-canceled-event'
import { ORDER_STATUS } from '@/core/entities/order-status.enum'

export interface OrderProps {
  deliveryManId?: UniqueEntityID
  recipientId: UniqueEntityID
  deliveryAddressId?: UniqueEntityID
  status: ORDER_STATUS
  createdAt: Date
  updatedAt?: Date | null
  deliveryAt?: Date | null
  withdrawnAt?: Date | null
  photoId?: UniqueEntityID | null
}

export class Order extends AggregateRoot<OrderProps> {
  get deliveryManId(): UniqueEntityID | undefined {
    return this.props.deliveryManId
  }

  set deliveryManId(deliveryManId: UniqueEntityID) {
    this.props.deliveryManId = deliveryManId
    this.touch()
  }

  get recipientId() {
    return this.props.recipientId
  }

  get photoId(): UniqueEntityID | null | undefined {
    return this.props.photoId
  }

  set photoId(photoId: UniqueEntityID) {
    this.props.photoId = photoId
  }

  get deliveryAddressId(): UniqueEntityID | undefined {
    return this.props.deliveryAddressId
  }

  set deliveryAddressId(deliveryAddressId: UniqueEntityID) {
    this.props.deliveryAddressId = deliveryAddressId
  }

  get status() {
    return this.props.status
  }

  set status(status: ORDER_STATUS) {
    switch (status) {
      case ORDER_STATUS.PENDING:
        this.addDomainEvent(new OrderCreatedEvent(this))
        break
      case ORDER_STATUS.DELIVERED:
        this.addDomainEvent(new OrderMakeDeliveredEvent(this))
        break
      case 'withdrawn':
        this.addDomainEvent(new OrderWithdrawnEvent(this))
        break
      case 'canceled':
        this.addDomainEvent(new OrderCanceledEvent(this))
        break
    }

    this.props.status = status

    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get deliveryAt(): Date | null | undefined {
    return this.props.deliveryAt
  }

  set deliveryAt(deliveryAt: Date) {
    if (!this.withdrawnAt) {
      throw new Error('Order is already withdrawn')
    }
    if (this.withdrawnAt > deliveryAt) {
      throw new Error('Delivery date must be after withdrawn date')
    }
    this.props.deliveryAt = deliveryAt

    this.touch()
  }

  get withdrawnAt(): Date | undefined | null {
    return this.props.withdrawnAt
  }

  set withdrawnAt(withdrawnAt: Date) {
    this.props.withdrawnAt = withdrawnAt
    this.touch()
  }

  touch() {
    this.props.updatedAt = new Date()
  }

  static create(props: Optional<OrderProps, 'createdAt'>, id?: UniqueEntityID) {
    const order = new Order(
      {
        createdAt: new Date(),
        updatedAt: props.updatedAt ?? new Date(),

        ...props,
      },
      id,
    )

    order.addDomainEvent(new OrderCreatedEvent(order))

    return order
  }
}
