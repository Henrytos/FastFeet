import { Either, left, right } from '@/core/either';
import { DeliveryMansRepository } from '../repositories/delivery-mans-repository';
import { AdministratorDoesNotExistError } from './errors/administrator-does-not-exist-error';
import { DeliveryManDoesNotExistError } from './errors/delivery-man-does-not-exist-error';
import { DeliveryMan } from '../../enterprise/entities/delivery-man';
import { HashGenerator } from '../cryptography/hash-generator';
import { AdministratorsRepository } from '../repositories/administrators-repository';
import { Cpf } from '../../enterprise/entities/value-object/cpf';

interface UpdateDeliveryManByAdministratorUseCaseRequest {
  deliveryManId: string;
  administratorId: string;
  cpf: string;
  name: string;
  password: string;
}
type UpdateDeliveryManByAdministratorUseCaseResponse = Either<
  AdministratorDoesNotExistError,
  {}
>;

export class UpdateDeliveryManByAdministratorUseCase {
  constructor(
    private administratorsRepository: AdministratorsRepository,
    private deliveryMansRepository: DeliveryMansRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    deliveryManId,
    administratorId,
    cpf,
    name,
    password,
  }: UpdateDeliveryManByAdministratorUseCaseRequest): Promise<UpdateDeliveryManByAdministratorUseCaseResponse> {
    const administrator =
      await this.administratorsRepository.findById(administratorId);

    if (!administrator) {
      return left(new AdministratorDoesNotExistError());
    }

    const deliveryMan =
      await this.deliveryMansRepository.findById(deliveryManId);

    if (!deliveryMan) {
      return left(new DeliveryManDoesNotExistError());
    }

    const passwordHash = await this.hashGenerator.hash(password);
    const updatedDeliveryMan = DeliveryMan.create(
      {
        cpf: Cpf.createFromValue(cpf),
        name,
        password: passwordHash,
      },
      deliveryMan.id,
    );

    await this.deliveryMansRepository.save(updatedDeliveryMan);
    return right({});
  }
}