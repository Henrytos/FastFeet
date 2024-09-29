import { Either, left, right } from '@/core/either';
import { Encrypter } from '../cryptography/encrypter';
import { HashComparer } from '../cryptography/hash-comparer';

import { AdministratorDoesNotExistError } from './errors/administrator-does-not-exist-error';
import { WrongCredentialsError } from './errors/wrong-credentials-error';
import { Cpf } from '../../enterprise/entities/value-object/cpf';
import { DeliveryMansRepository } from '../repositories/delivery-mans-repository';
import { DeliveryManDoesNotExistError } from './errors/delivery-man-does-not-exist-error';

interface AuthenticateDeliveryManUseCaseRequest {
  cpf: string;
  password: string;
}
type AuthenticateDeliveryManUseCaseResponse = Either<
  AdministratorDoesNotExistError | WrongCredentialsError,
  {
    accessToken: string;
  }
>;

export class AuthenticateDeliveryManUseCase {
  constructor(
    private deliveryMansRepository: DeliveryMansRepository,
    private encrypter: Encrypter,
    private hashComparer: HashComparer,
  ) {}

  async execute({
    cpf,
    password,
  }: AuthenticateDeliveryManUseCaseRequest): Promise<AuthenticateDeliveryManUseCaseResponse> {
    const administrator = await this.deliveryMansRepository.findByCpf(
      Cpf.createFromValue(cpf),
    );

    if (!administrator) {
      return left(new DeliveryManDoesNotExistError());
    }

    const passwordMatch = await this.hashComparer.comparer(
      password,
      administrator.password,
    );

    if (!passwordMatch) {
      return left(new WrongCredentialsError());
    }

    const accessToken = await this.encrypter.encrypt({
      sub: administrator.id.toString(),
    });

    return right({ accessToken });
  }
}
