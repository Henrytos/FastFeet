import { Either, left, right } from "@/core/either";
import { AdministratorsRepository } from "../repositories/administrators-repository";
import { DeliveryMansRepository } from "../repositories/delivery-mans-repository";
import { AdministratorDoesNotExistError } from "./errors/administrator-does-not-exist-error";
import { DeliveryMan } from "../../enterprise/entites/delivery-man";
import { HashGenerator } from "../cryptography/hash-generator";
import { Cpf } from "../../enterprise/entites/value-object/cpf";

interface CreateDeliveryManByAdministratorUseCaseRequest {
  cpf: string;
  name: string;
  password: string;
  administratorId: string;
}
type CreateDeliveryManByAdministratorUseCaseResponse = Either<
  AdministratorDoesNotExistError,
  {}
>;

export class CreateDeliveryManByAdministratorUseCase {
  constructor(
    private administratorsRepository: AdministratorsRepository,
    private deliveryMansRepository: DeliveryMansRepository,
    private hashGenerator: HashGenerator
  ) {}

  async execute({
    cpf,
    name,
    password,
    administratorId,
  }: CreateDeliveryManByAdministratorUseCaseRequest): Promise<CreateDeliveryManByAdministratorUseCaseResponse> {
    const administrator = await this.administratorsRepository.findById(
      administratorId
    );

    if (!administrator) {
      return left(new AdministratorDoesNotExistError());
    }

    const passwordHash = await this.hashGenerator.hash(password);

    const deliveryMan = DeliveryMan.create({
      cpf: Cpf.createFromValue(cpf),
      name,
      password: passwordHash,
      administratorId: administrator.id,
    });

    await this.deliveryMansRepository.create(deliveryMan);

    return right({});
  }
}
