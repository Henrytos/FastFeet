import { Either, left, right } from '@/core/either'

import { AdministratorsRepository } from '../repositories/administrators-repository'
import { DeliveryMansRepository } from '../repositories/delivery-mans-repository'

import { AdministratorDoesNotExistError } from './errors/administrator-does-not-exist-error'
import { DeliveryMan } from '../../enterprise/entities/delivery-man'
import { HashGenerator } from '../cryptography/hash-generator'
import { Cpf } from '../../enterprise/entities/value-object/cpf'
import { WrongCredentialsError } from './errors/wrong-credentials-error'
import { Injectable } from '@nestjs/common'

interface RegisterDeliveryManUseCaseRequest {
  cpf: string
  name: string
  password: string
  administratorId: string
}
type RegisterDeliveryManUseCaseResponse = Either<
  AdministratorDoesNotExistError | WrongCredentialsError,
  object
>

@Injectable()
export class RegisterDeliveryManUseCase {
  constructor(
    private readonly administratorsRepository: AdministratorsRepository,
    private readonly deliveryMansRepository: DeliveryMansRepository,
    private readonly hashGenerator: HashGenerator,
  ) {}

  async execute({
    cpf,
    name,
    password,
    administratorId,
  }: RegisterDeliveryManUseCaseRequest): Promise<RegisterDeliveryManUseCaseResponse> {
    const administrator =
      await this.administratorsRepository.findById(administratorId)

    if (!administrator) {
      return left(new AdministratorDoesNotExistError())
    }

    const deliveryManAlreadyExists =
      await this.deliveryMansRepository.findByCpf(Cpf.create(cpf))

    if (deliveryManAlreadyExists) {
      return left(new WrongCredentialsError())
    }

    const passwordHash = await this.hashGenerator.hash(password)

    const deliveryMan = DeliveryMan.create({
      cpf: Cpf.create(cpf),
      name,
      password: passwordHash,
    })

    await this.deliveryMansRepository.create(deliveryMan)

    return right({})
  }
}
