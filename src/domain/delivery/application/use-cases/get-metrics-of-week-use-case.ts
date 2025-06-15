import { Either, left, right } from '@/core/either'
import { AdministratorsRepository } from '../repositories/administrators-repository'
import { AdministratorDoesNotExistError } from './errors/administrator-does-not-exist-error'
import { MetricsOfWeek } from '@/domain/delivery/enterprise/entities/value-object/metrics-of-week'
import { OrdersRepository } from '../repositories/orders-repository'
import { WrongCredentialsError } from './errors/wrong-credentials-error'

interface GetMetricsOfWeekUseCaseRequest {
  administratorId: string
  pastTargetWeek: number
}

type GetMetricsOfWeekUseCaseResponse = Either<
  AdministratorDoesNotExistError | WrongCredentialsError,
  {
    metrics: MetricsOfWeek
  }
>

export class GetMetricsOfWeekUseCase {
  constructor(
    private administratorsRepository: AdministratorsRepository,
    private ordersRepository: OrdersRepository,
  ) {}

  async execute({
    administratorId,
    pastTargetWeek,
  }: GetMetricsOfWeekUseCaseRequest): Promise<GetMetricsOfWeekUseCaseResponse> {
    if (typeof pastTargetWeek !== 'number') {
      return left(new WrongCredentialsError())
    }

    const pastTargetWeekParse = Math.abs(pastTargetWeek)

    const administrator =
      await this.administratorsRepository.findById(administratorId)

    if (!administrator) {
      return left(new AdministratorDoesNotExistError())
    }

    const metricsOfWeek =
      await this.ordersRepository.getMetricsOfWeek(pastTargetWeekParse)

    return right({
      metrics: metricsOfWeek,
    })
  }
}
