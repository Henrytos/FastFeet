import { Either, left, right } from '@/core/either'
import { Encrypter } from '../cryptography/encrypter'
import { HashComparer } from '../cryptography/hash-comparer'

import { WrongCredentialsError } from './errors/wrong-credentials-error'
import { Cpf } from '../../enterprise/entities/value-object/cpf'
import { DeliveryMansRepository } from '../repositories/delivery-mans-repository'
import { DeliveryManDoesNotExistError } from './errors/delivery-man-does-not-exist-error'
import { Injectable } from '@nestjs/common'

interface AuthenticateDeliveryManUseCaseRequest {
  cpf: string
  password: string
}
type AuthenticateDeliveryManUseCaseResponse = Either<
  DeliveryManDoesNotExistError | WrongCredentialsError,
  {
    accessToken: string
  }
>

@Injectable()
export class AuthenticateDeliveryManUseCase {
  constructor(
    private readonly deliveryMansRepository: DeliveryMansRepository,
    private readonly encrypter: Encrypter,
    private readonly hashComparer: HashComparer,
  ) {}

  async execute({
    cpf,
    password,
  }: AuthenticateDeliveryManUseCaseRequest): Promise<AuthenticateDeliveryManUseCaseResponse> {
    const deliveryMan = await this.deliveryMansRepository.findByCpf(
      Cpf.create(cpf),
    )

    if (!deliveryMan) {
      return left(new DeliveryManDoesNotExistError())
    }

    const passwordMatch = await this.hashComparer.comparer(
      password,
      deliveryMan.password,
    )

    if (!passwordMatch) {
      return left(new WrongCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: deliveryMan.id.toString(),
      role: 'DELIVERY_MAN',
    })

    return right({ accessToken })
  }
}
