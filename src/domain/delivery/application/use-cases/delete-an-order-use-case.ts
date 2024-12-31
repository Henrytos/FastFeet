import { Either, left, right } from '@/core/either'
import { OrderDoesNotExistError } from './errors/order-does-not-exist-error'
import { AdministratorDoesNotExistError } from './errors/administrator-does-not-exist-error'
import { OrdersRepository } from '../repositories/orders-repository'
import { AdministratorsRepository } from '../repositories/administrators-repository'
import { Injectable } from '@nestjs/common'

interface DeleteAnOrderUseCaseRequest {
  orderId: string
  administratorId: string
}

type DeleteAnOrderUseCaseResponse = Either<
  OrderDoesNotExistError | AdministratorDoesNotExistError,
  object
>

@Injectable()
export class DeleteAnOrderUseCase {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly administratorsRepository: AdministratorsRepository,
  ) {}

  async execute({
    orderId,
    administratorId,
  }: DeleteAnOrderUseCaseRequest): Promise<DeleteAnOrderUseCaseResponse> {
    const order = await this.ordersRepository.findById(orderId)
    if (!order) {
      return left(new OrderDoesNotExistError())
    }

    const administratorDoesNotExist =
      !(await this.administratorsRepository.findById(administratorId))
    if (administratorDoesNotExist) {
      return left(new AdministratorDoesNotExistError())
    }

    await this.ordersRepository.delete(order)

    // TODO: send email to the user

    return right({})
  }
}
