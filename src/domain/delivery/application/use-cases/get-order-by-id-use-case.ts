import { Either, left, right } from '@/core/either'
import { OrderDoesNotExistError } from './errors/order-does-not-exist-error'
import { Order } from '../../enterprise/entities/order'
import { OrdersRepository } from '../repositories/orders-repository'
import { Injectable } from '@nestjs/common'

interface GetOrderByIdUseCaseRequest {
  orderId: string
}

type GetOrderByIdUseCaseResponse = Either<
  OrderDoesNotExistError,
  {
    order: Order
  }
>

@Injectable()
export class GetOrderByIdUseCase {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async execute({
    orderId,
  }: GetOrderByIdUseCaseRequest): Promise<GetOrderByIdUseCaseResponse> {
    const order = await this.ordersRepository.findById(orderId)
    if (!order) {
      return left(new OrderDoesNotExistError())
    }

    return right({
      order,
    })
  }
}
