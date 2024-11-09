import { Either, right } from '@/core/either'
import { DeliveryMansRepository } from '../repositories/delivery-mans-repository'
import { DeliveryMan } from '../../enterprise/entities/delivery-man'

interface FetchDeliveryMansUseCaseRequest {
  page: number
  perPage: number
}

type FetchDeliveryMansUseCaseResponse = Either<
  null,
  {
    deliveryMans: DeliveryMan[]
  }
>

export class FetchDeliveryMansUseCase {
  constructor(
    private readonly deliveryMansRepository: DeliveryMansRepository,
  ) {}

  async execute({
    page,
    perPage,
  }: FetchDeliveryMansUseCaseRequest): Promise<FetchDeliveryMansUseCaseResponse> {
    const deliveryMans =
      await this.deliveryMansRepository.fetchDeliveryManByPage(page, perPage)

    return right({
      deliveryMans,
    })
  }
}
