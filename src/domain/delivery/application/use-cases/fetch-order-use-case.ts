import { Either } from '@/core/either'
import { AdministratorDoesNotExistError } from './errors/administrator-does-not-exist-error'
import { Order } from '@prisma/client'
import { Injectable } from '@nestjs/common'
import { AdministratorsRepository } from '../repositories/administrators-repository'
import { OrdersRepository } from '../repositories/orders-repository'

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

  async execute(
    request: FetchOrderUseCaseRequest,
  ): Promise<FetchOrderUseCaseResponse> {}
}
