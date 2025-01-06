import { Either, left, right } from '@/core/either'
import { OrdersRepository } from '../repositories/orders-repository'
import { OrderDoesNotExistError } from './errors/order-does-not-exist-error'
import { DeliveryMansRepository } from '../repositories/delivery-mans-repository'
import { DeliveryManDoesNotExistError } from './errors/delivery-man-does-not-exist-error'
import { WrongCredentialsError } from './errors/wrong-credentials-error'
import { PhotosRepository } from '../repositories/photos-repository'
import { PhotoDoesNotExistError } from './errors/photo-does-not-exist-error'
import { ORDER_STATUS } from '@/core/entities/order-status.enum'

export interface MarkAnOrderAsDeliveredUseCaseRequest {
  orderId: string
  deliveryManId: string
  photoId: string
}
export type MarkAnOrderAsDeliveredUseCaseResponse = Either<
  | OrderDoesNotExistError
  | PhotoDoesNotExistError
  | DeliveryManDoesNotExistError
  | WrongCredentialsError,
  object
>

export class MarkAnOrderAsDeliveredUseCase {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly deliveryMansRepository: DeliveryMansRepository,
    private readonly photosRepository: PhotosRepository,
  ) {}

  async execute({
    orderId,
    deliveryManId,
    photoId,
  }: MarkAnOrderAsDeliveredUseCaseRequest): Promise<MarkAnOrderAsDeliveredUseCaseResponse> {
    const order = await this.ordersRepository.findById(orderId)
    if (!order) {
      return left(new OrderDoesNotExistError())
    }

    const deliveryMan =
      await this.deliveryMansRepository.findById(deliveryManId)
    if (!deliveryMan) {
      return left(new DeliveryManDoesNotExistError())
    }

    if (!order.deliveryManId.equals(deliveryMan.id)) {
      return left(new WrongCredentialsError())
    }

    if (!order.isValidForDelivered()) {
      return left(new WrongCredentialsError())
    }

    const photo = await this.photosRepository.findById(photoId)
    if (!photo) {
      return left(new PhotoDoesNotExistError())
    }

    order.status = ORDER_STATUS.DELIVERED
    order.photoId = photo.id

    await this.ordersRepository.save(order)

    return right({})
  }
}
