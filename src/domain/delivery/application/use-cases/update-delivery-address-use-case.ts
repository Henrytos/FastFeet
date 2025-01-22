import { Either, left, right } from '@/core/either'
import { DeliveryAddressRepository } from '../repositories/delivery-address-repository'
import { DeliveryAddressDoesNotExistError } from './errors/delivery-address-does-not-exist-error'
import { AdministratorsRepository } from '../repositories/administrators-repository'
import { AdministratorDoesNotExistError } from './errors/administrator-does-not-exist-error'
import { Injectable } from '@nestjs/common'
import { DeliveryAddress } from '../../enterprise/entities/delivery-address'

interface UpdateDeliveryAddressUseCaseRequest {
  administratorId: string
  deliveryAddressId: string
  state: string
  city: string
  neighborhood: string
  street: string
  zip: string
  number: string
  latitude: number
  longitude: number
}

type UpdateDeliveryAddressUseCaseResponse = Either<
  DeliveryAddressDoesNotExistError | AdministratorDoesNotExistError,
  object
>

@Injectable()
export class UpdateDeliveryAddressUseCase {
  constructor(
    private readonly administratorsRepository: AdministratorsRepository,
    private readonly deliveryAddressRepository: DeliveryAddressRepository,
  ) {}

  async execute({
    administratorId,
    deliveryAddressId,
    state,
    city,
    neighborhood,
    street,
    zip,
    number,
    latitude,
    longitude,
  }: UpdateDeliveryAddressUseCaseRequest): Promise<UpdateDeliveryAddressUseCaseResponse> {
    const administrator =
      await this.administratorsRepository.findById(administratorId)
    if (!administrator) {
      return left(new AdministratorDoesNotExistError())
    }

    const deliveryAddress =
      await this.deliveryAddressRepository.findById(deliveryAddressId)
    if (!deliveryAddress) {
      return left(new DeliveryAddressDoesNotExistError())
    }

    const deliveryAddressUpdated = DeliveryAddress.create(
      {
        state,
        city,
        neighborhood,
        street,
        zip,
        number,
        latitude,
        longitude,
      },
      deliveryAddress.id,
    )

    this.deliveryAddressRepository.save(deliveryAddressUpdated)

    return right({})
  }
}
