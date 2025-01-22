import { ORDER_STATUS } from '@/core/constants/order-status.enum'
import { Either, left, right } from '@/core/either'
import { OrderDoesNotExistError } from './errors/order-does-not-exist-error'
import { AdministratorDoesNotExistError } from './errors/administrator-does-not-exist-error'
import { DeliveryManDoesNotExistError } from './errors/delivery-man-does-not-exist-error'
import { DeliveryAddressDoesNotExistError } from './errors/delivery-address-does-not-exist-error'
import { PhotoDoesNotExistError } from './errors/photo-does-not-exist-error'
import { Order } from '../../enterprise/entities/order'
import { Injectable } from '@nestjs/common'
import { AdministratorsRepository } from '../repositories/administrators-repository'
import { DeliveryAddressRepository } from '../repositories/delivery-address-repository'
import { DeliveryMansRepository } from '../repositories/delivery-mans-repository'
import { OrdersRepository } from '../repositories/orders-repository'
import { PhotosRepository } from '../repositories/photos-repository'
import { RecipientsRepository } from '../repositories/recipients-repository'
import { RecipientDoesNotExistError } from './errors/recipient-does-not-exist-error'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface UpdateOrderUseCaseRequest {
  orderId: string
  administratorId: string
  deliveryManId: string
  status: ORDER_STATUS
  deliveryAt: Date
  withdrawnAt: Date
}

type UpdateOrderUseCaseResponse = Either<
  | OrderDoesNotExistError
  | AdministratorDoesNotExistError
  | RecipientDoesNotExistError
  | DeliveryManDoesNotExistError
  | DeliveryAddressDoesNotExistError
  | PhotoDoesNotExistError,
  {
    order: Order
  }
>

@Injectable()
export class UpdateOrderUseCase {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly administratorsRepository: AdministratorsRepository,
    private readonly deliveryMansRepository: DeliveryMansRepository,
    private readonly deliveryAddressRepository: DeliveryAddressRepository,
    private readonly recipientsRepository: RecipientsRepository,
    private readonly photosRepository: PhotosRepository,
  ) {}

  async execute({
    orderId,
    administratorId,
    deliveryManId,
    status,
    deliveryAt,
    withdrawnAt,
  }: UpdateOrderUseCaseRequest): Promise<UpdateOrderUseCaseResponse> {
    const order = await this.ordersRepository.findById(orderId)
    if (!order) {
      return left(new OrderDoesNotExistError())
    }

    const administrator =
      await this.administratorsRepository.findById(administratorId)
    if (!administrator) {
      return left(new AdministratorDoesNotExistError())
    }

    const deliveryMan =
      await this.deliveryMansRepository.findById(deliveryManId)
    if (!deliveryMan) {
      return left(new DeliveryManDoesNotExistError())
    }
    const updatedOrder = Order.create(
      {
        status,
        deliveryAddressId: order.deliveryAddressId,
        deliveryManId: new UniqueEntityID(deliveryManId),
        recipientId: order.recipientId,
        photoId: order.photoId,
        withdrawnAt,
        deliveryAt,
      },
      order.id,
    )

    await this.ordersRepository.save(updatedOrder)

    return right({ order: updatedOrder })
  }
}
