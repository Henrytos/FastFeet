import { Either, left, right } from '@/core/either'
import { AdministratorsRepository } from '../repositories/administrators-repository'
import { DeliveryAddressRepository } from '../repositories/delivery-address-repository'
import { AdministratorDoesNotExistError } from './errors/administrator-does-not-exist-error'
import { DeliveryAddress } from '../../enterprise/entities/delivery-address'
import { Injectable } from '@nestjs/common'

interface RegisterDeliveryAddressUseCaseRequest {
  administratorId: string
  state: string
  city: string
  neighborhood: string
  street: string
  zip: string
  number: string
  latitude: number
  longitude: number
}

type RegisterDeliveryAddressUseCaseResponse = Either<
  AdministratorDoesNotExistError,
  {
    deliveryAddress: DeliveryAddress
  }
>

@Injectable()
export class RegisterDeliveryAddressUseCase {
  constructor(
    private readonly administratorsRepository: AdministratorsRepository,
    private readonly deliveryAddressRepository: DeliveryAddressRepository,
  ) {}

  async execute({
    administratorId,
    state,
    city,
    neighborhood,
    street,
    zip,
    number,
    latitude,
    longitude,
  }: RegisterDeliveryAddressUseCaseRequest): Promise<RegisterDeliveryAddressUseCaseResponse> {
    const administrator =
      await this.administratorsRepository.findById(administratorId)
    if (!administrator) {
      return left(new AdministratorDoesNotExistError())
    }

    const deliveryAddress = DeliveryAddress.create({
      state,
      city,
      neighborhood,
      street,
      zip,
      number,
      latitude,
      longitude,
    })

    await this.deliveryAddressRepository.create(deliveryAddress)

    return right({ deliveryAddress })
  }
}
