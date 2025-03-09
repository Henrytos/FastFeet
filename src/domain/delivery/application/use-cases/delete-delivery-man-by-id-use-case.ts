import { Either, left, right } from '@/core/either'
import { DeliveryMansRepository } from '../repositories/delivery-mans-repository'
import { DeliveryManDoesNotExistError } from './errors/delivery-man-does-not-exist-error'
import { WrongCredentialsError } from './errors/wrong-credentials-error'
import { AdministratorsRepository } from '../repositories/administrators-repository'
import { AdministratorDoesNotExistError } from './errors/administrator-does-not-exist-error'
import { Injectable } from '@nestjs/common'

interface DeleteDeliveryManByIdUseCaseRequest {
  deliveryManId: string
  administratorId: string
}
type DeleteDeliveryManByIdUseCaseResponse = Either<
  DeliveryManDoesNotExistError | WrongCredentialsError,
  object
>

@Injectable()
export class DeleteDeliveryManByIdUseCase {
  constructor(
    private readonly administratorsRepository: AdministratorsRepository,
    private readonly deliveryMansRepository: DeliveryMansRepository,
  ) {}

  async execute({
    deliveryManId,
    administratorId,
  }: DeleteDeliveryManByIdUseCaseRequest): Promise<DeleteDeliveryManByIdUseCaseResponse> {
    const administrator =
      await this.administratorsRepository.findById(administratorId)

    if (!administrator) {
      return left(new AdministratorDoesNotExistError())
    }

    const deliveryMan =
      await this.deliveryMansRepository.findById(deliveryManId)

    if (!deliveryMan) {
      return left(new DeliveryManDoesNotExistError())
    }

    await this.deliveryMansRepository.delete(deliveryMan)

    return right({})
  }
}
