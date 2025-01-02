import { Either, left, right } from '@/core/either'
import { AdministratorDoesNotExistError } from './errors/administrator-does-not-exist-error'
import { AdministratorsRepository } from '../repositories/administrators-repository'
import { OrdersRepository } from '../repositories/orders-repository'
import { Order } from '../../enterprise/entities/order'

import { Injectable } from '@nestjs/common'
interface FetchOrderUseCaseRequest {
  page: number
  perPage: number
  administratorId: string
}

type FetchOrderUseCaseResponse = Either<
  AdministratorDoesNotExistError,
  { orders: Order[] }
>

@Injectable()
export class FetchOrderUseCase {
  constructor(
    private readonly administratorsRepository: AdministratorsRepository,
    private readonly ordersRepository: OrdersRepository,
  ) {}

  async execute({
    page,
    perPage,
    administratorId,
  }: FetchOrderUseCaseRequest): Promise<FetchOrderUseCaseResponse> {
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
