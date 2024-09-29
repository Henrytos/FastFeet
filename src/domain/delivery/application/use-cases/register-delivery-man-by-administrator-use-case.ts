import { Either, left, right } from '@/core/either';
import { AdministratorsRepository } from '../repositories/administrators-repository';
import { DeliveryMansRepository } from '../repositories/delivery-mans-repository';
import { AdministratorDoesNotExistError } from './errors/administrator-does-not-exist-error';
import { DeliveryMan } from '../../enterprise/entities/delivery-man';
import { HashGenerator } from '../cryptography/hash-generator';
import { Cpf } from '../../enterprise/entities/value-object/cpf';

interface RegisterDeliveryManByAdministratorUseCaseRequest {
  cpf: string;
  name: string;
  password: string;
  administratorId: string;
}
type RegisterDeliveryManByAdministratorUseCaseResponse = Either<
  AdministratorDoesNotExistError,
  {}
>;

export class RegisterDeliveryManByAdministratorUseCase {
  constructor(
    private administratorsRepository: AdministratorsRepository,
    private deliveryMansRepository: DeliveryMansRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    cpf,
    name,
    password,
    administratorId,
  }: RegisterDeliveryManByAdministratorUseCaseRequest): Promise<RegisterDeliveryManByAdministratorUseCaseResponse> {
    const administrator =
      await this.administratorsRepository.findById(administratorId);

    if (!administrator) {
      return left(new AdministratorDoesNotExistError());
    }

    const passwordHash = await this.hashGenerator.hash(password);

    const deliveryMan = DeliveryMan.create({
      cpf: Cpf.createFromValue(cpf),
      name,
      password: passwordHash,
    });

    await this.deliveryMansRepository.create(deliveryMan);

    return right({});
  }
}
