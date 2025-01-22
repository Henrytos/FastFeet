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
  recipientId: string
  deliveryAddressId: string
  status: ORDER_STATUS
  photoId: string
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
    recipientId,
    deliveryAddressId,
    status,
    photoId,
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

    const deliveryAddress =
      await this.deliveryAddressRepository.findById(deliveryAddressId)
    if (!deliveryAddress) {
      return left(new DeliveryAddressDoesNotExistError())
    }

    const recipient = await this.recipientsRepository.findById(recipientId)
    if (!recipient) {
      return left(new RecipientDoesNotExistError())
    }

    const photo = await this.photosRepository.findById(photoId)
    if (!photo) {
      return left(new PhotoDoesNotExistError())
    }

    const updatedOrder = Order.create(
      {
        status,
        deliveryAddressId: new UniqueEntityID(deliveryAddressId),
        deliveryManId: new UniqueEntityID(deliveryManId),
        recipientId: new UniqueEntityID(recipientId),
        photoId: new UniqueEntityID(photoId),
        withdrawnAt,
        deliveryAt,
      },
      order.id,
    )

    await this.ordersRepository.save(updatedOrder)

    return right({ order: updatedOrder })
  }
}
