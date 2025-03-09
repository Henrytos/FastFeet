import { Either, left, right } from '@/core/either'
import { OrderDoesNotExistError } from './errors/order-does-not-exist-error'
import { OrdersRepository } from '../repositories/orders-repository'
import { Injectable } from '@nestjs/common'
import { OrderWithDetails } from '../../enterprise/entities/value-object/order-with-details'

interface GetOrderByIdUseCaseRequest {
  orderId: string
}

type GetOrderByIdUseCaseResponse = Either<
  OrderDoesNotExistError,
  {
    orderWithDetails: OrderWithDetails
  }
>

@Injectable()
export class GetOrderByIdUseCase {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async execute({
    orderId,
  }: GetOrderByIdUseCaseRequest): Promise<GetOrderByIdUseCaseResponse> {
    const orderWithDetails =
      await this.ordersRepository.findByIdWithDetails(orderId)
    if (!orderWithDetails) {
      return left(new OrderDoesNotExistError())
    }

    return right({
      orderWithDetails,
    })
  }
}
