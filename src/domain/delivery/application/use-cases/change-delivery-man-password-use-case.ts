import { Either, left, right } from '@/core/either';
import { HashGenerator } from '../cryptography/hash-generator';
import { AdministratorsRepository } from '../repositories/administrators-repository';
import { DeliveryMansRepository } from '../repositories/delivery-mans-repository';
import { AdministratorDoesNotExistError } from './errors/administrator-does-not-exist-error';
import { DeliveryManDoesNotExistError } from './errors/delivery-man-does-not-exist-error';
import { Cpf } from '../../enterprise/entities/value-object/cpf';
import { Injectable } from '@nestjs/common';

interface ChangeDeliveryManPasswordUseCaseRequest {
  administratorId: string;
  cpf: string;
  password: string;
}

type ChangeDeliveryManPasswordUseCaseResponse = Either<
  AdministratorDoesNotExistError | DeliveryManDoesNotExistError,
  {}
>;

@Injectable()
export class ChangeDeliveryManPasswordUseCase {
  constructor(
    private administratorsRepository: AdministratorsRepository,
    private deliveryMansRepository: DeliveryMansRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    administratorId,
    cpf,
    password,
  }: ChangeDeliveryManPasswordUseCaseRequest): Promise<ChangeDeliveryManPasswordUseCaseResponse> {
    const administrator =
      await this.administratorsRepository.findById(administratorId);
    if (!administrator) {
      return left(new AdministratorDoesNotExistError());
    }

    const deliveryMan = await this.deliveryMansRepository.findByCpf(
      Cpf.createFromValue(cpf),
    );
    if (!deliveryMan) {
      return left(new DeliveryManDoesNotExistError());
    }

    deliveryMan.password = await this.hashGenerator.hash(password);

    return right({});
  }
}
