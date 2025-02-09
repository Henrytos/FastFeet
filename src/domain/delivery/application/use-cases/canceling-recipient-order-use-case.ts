import { Either, left, right } from '@/core/either'
import { OrdersRepository } from '../repositories/orders-repository'
import { OrderDoesNotExistError } from './errors/order-does-not-exist-error'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { ORDER_STATUS } from '@/core/constants/order-status.enum'
import { DeliveryMansRepository } from '../repositories/delivery-mans-repository'
import { DeliveryManDoesNotExistError } from './errors/delivery-man-does-not-exist-error'
import { Injectable } from '@nestjs/common'

interface CancelingRecipientOrderUseCaseRequest {
  deliveryManId: string
  orderId: string
}
type CancelingRecipientOrderUseCaseResponse = Either<
  DeliveryManDoesNotExistError | OrderDoesNotExistError | NotAllowedError,
  object
>

@Injectable()
export class CancelingRecipientOrderUseCase {
  constructor(
    private readonly deliveryMansRepository: DeliveryMansRepository,
    private readonly ordersRepository: OrdersRepository,
  ) {}

  async execute({
    deliveryManId,
    orderId,
  }: CancelingRecipientOrderUseCaseRequest): Promise<CancelingRecipientOrderUseCaseResponse> {
    const deliveryMan =
      await this.deliveryMansRepository.findById(deliveryManId)

    if (!deliveryMan) {
      return left(new DeliveryManDoesNotExistError())
    }

    const order = await this.ordersRepository.findById(orderId)
    if (!order) {
      return left(new OrderDoesNotExistError())
    }
    if (order.status === ORDER_STATUS.CANCELED) {
      return left(new NotAllowedError())
    }

    order.status = ORDER_STATUS.CANCELED
    await this.ordersRepository.save(order)

    return right({})
  }
}
