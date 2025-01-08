import { Either, left, right } from '@/core/either'
import { Encrypter } from '../cryptography/encrypter'
import { HashComparer } from '../cryptography/hash-comparer'

import { WrongCredentialsError } from './errors/wrong-credentials-error'
import { Cpf } from '../../enterprise/entities/value-object/cpf'
import { DeliveryMansRepository } from '../repositories/delivery-mans-repository'
import { DeliveryManDoesNotExistError } from './errors/delivery-man-does-not-exist-error'
import { Injectable } from '@nestjs/common'
import { AdministratorsRepository } from '../repositories/administrators-repository'
import { USER_ROLE } from '@/core/constants/role.enum'

interface AuthenticateUserUseCaseRequest {
  cpf: string
  password: string
}
type AuthenticateUserUseCaseResponse = Either<
  DeliveryManDoesNotExistError | WrongCredentialsError,
  {
    accessToken: string
  }
>

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    private readonly deliveryMansRepository: DeliveryMansRepository,
    private readonly administratorsRepository: AdministratorsRepository,
    private readonly encrypter: Encrypter,
    private readonly hashComparer: HashComparer,
  ) {}

  async execute({
    cpf,
    password,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const deliveryMan = await this.deliveryMansRepository.findByCpf(
      Cpf.create(cpf),
    )

    if (deliveryMan) {
      const deliveryManPasswordMatch = await this.hashComparer.comparer(
        password,
        deliveryMan.password,
      )
      if (!deliveryManPasswordMatch) {
        return left(new WrongCredentialsError())
      }

      const accessToken = await this.encrypter.encrypt({
        sub: deliveryMan.id.toString(),
        role: USER_ROLE.DELIVERY_MAN,
      })

      return right({ accessToken })
    }
    const administrator = await this.administratorsRepository.findByCpf(
      Cpf.create(cpf),
    )

    if (administrator) {
      const administratorPasswordMAtch = await this.hashComparer.comparer(
        password,
        administrator.password,
      )

      if (!administratorPasswordMAtch) {
        return left(new WrongCredentialsError())
      }

      const accessToken = await this.encrypter.encrypt({
        role: USER_ROLE.ADMINISTRATOR,
        sub: administrator.id.toString(),
      })

      return right({ accessToken })
    }

    if (!administrator) {
      return left(new DeliveryManDoesNotExistError())
    }

    if (!deliveryMan) {
      return left(new DeliveryManDoesNotExistError())
    }
  }
}
