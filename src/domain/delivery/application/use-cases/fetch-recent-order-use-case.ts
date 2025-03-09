import { Either, left, right } from '@/core/either'
import { AdministratorDoesNotExistError } from './errors/administrator-does-not-exist-error'
import { AdministratorsRepository } from '../repositories/administrators-repository'
import { OrdersRepository } from '../repositories/orders-repository'
import { Order } from '../../enterprise/entities/order'

import { Injectable } from '@nestjs/common'
interface FetchRecentOrderUseCaseRequest {
  page: number
  perPage: number
  administratorId: string
}

type FetchRecentOrderUseCaseResponse = Either<
  AdministratorDoesNotExistError,
  { orders: Order[] }
>

@Injectable()
export class FetchRecentOrderUseCase {
  constructor(
    private readonly administratorsRepository: AdministratorsRepository,
    private readonly ordersRepository: OrdersRepository,
  ) {}

  async execute({
    page,
    perPage,
    administratorId,
  }: FetchRecentOrderUseCaseRequest): Promise<FetchRecentOrderUseCaseResponse> {
    const administratorDoesNotExist =
      !(await this.administratorsRepository.exists(administratorId))

    if (administratorDoesNotExist) {
      return left(new AdministratorDoesNotExistError())
    }

    const orders = await this.ordersRepository.fetchRecentOrder({
      page,
      perPage,
    })

    return right({ orders })
  }
}
