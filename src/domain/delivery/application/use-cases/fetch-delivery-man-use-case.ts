import { Either, left, right } from '@/core/either'
import { DeliveryMansRepository } from '../repositories/delivery-mans-repository'
import { DeliveryMan } from '../../enterprise/entities/delivery-man'
import { AdministratorsRepository } from '../repositories/administrators-repository'
import { AdministratorDoesNotExistError } from './errors/administrator-does-not-exist-error'
import { Injectable } from '@nestjs/common'

interface FetchDeliveryMansUseCaseRequest {
  page: number
  perPage: number
  administratorId: string
}

type FetchDeliveryMansUseCaseResponse = Either<
  AdministratorDoesNotExistError,
  {
    deliveryMans: DeliveryMan[]
  }
>

@Injectable()
export class FetchDeliveryMansUseCase {
  constructor(
    private readonly deliveryMansRepository: DeliveryMansRepository,
    private readonly administratorsRepository: AdministratorsRepository,
  ) {}

  async execute({
    page,
    perPage,
    administratorId,
  }: FetchDeliveryMansUseCaseRequest): Promise<FetchDeliveryMansUseCaseResponse> {
    const administratorNotAlreadyExists =
      !(await this.administratorsRepository.findById(administratorId))

    if (administratorNotAlreadyExists) {
      return left(new AdministratorDoesNotExistError())
    }
    const deliveryMans =
      await this.deliveryMansRepository.fetchDeliveryManByPage(page, perPage)

    return right({
      deliveryMans,
    })
  }
}
