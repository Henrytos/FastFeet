import { Either, left, right } from '@/core/either'
import { OrdersRepository } from '../repositories/orders-repository'
import { Order } from '../../enterprise/entities/order'
import { DeliveryMansRepository } from '../repositories/delivery-mans-repository'
import { DeliveryManDoesNotExistError } from './errors/delivery-man-does-not-exist-error'
import { Injectable } from '@nestjs/common'

interface FetchOrderByDeliveryManIdUseCaseRequest {
  deliveryManId: string
  page: number
  perPage: number
}

type FetchOrderByDeliveryManIdUseCaseResponse = Either<
  DeliveryManDoesNotExistError,
  { orders: Order[] }
>

@Injectable()
export class FetchOrderByDeliveryManIdUseCase {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly deliveryMansRepository: DeliveryMansRepository,
  ) {}

  async execute({
    deliveryManId,
    page,
    perPage,
  }: FetchOrderByDeliveryManIdUseCaseRequest): Promise<FetchOrderByDeliveryManIdUseCaseResponse> {
    const deliveryman =
      await this.deliveryMansRepository.findById(deliveryManId)

    if (!deliveryman) {
      return left(new DeliveryManDoesNotExistError())
    }

    const orders = await this.ordersRepository.fetchOrderByDeliveryManId({
      deliveryManId,
      page,
      perPage,
    })

    return right({ orders })
  }
}
