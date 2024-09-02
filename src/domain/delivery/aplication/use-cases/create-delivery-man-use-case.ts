import { Either, left, right } from "@/core/either";
import { AdministratorsRepository } from "../repositories/administrators-repository";
import { DeliveryMansRepository } from "../repositories/delivery-mans-repository";
import { AdministratorDoesNotExistError } from "./errors/administrator-does-not-exist-error";
import { DeliveryMan } from "../../enterprise/entites/delivery-man";
import { HashGenerator } from "../cryptography/hash-generator";

interface CreateDeliveryManUseCaseRequest {
  cpf: string;
  name: string;
  password: string;
  administratorId: string;
}
type CreateDeliveryManUseCaseResponse = Either<
  AdministratorDoesNotExistError,
  {}
>;

export class CreateDeliveryManUseCase {
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
  }: CreateDeliveryManUseCaseRequest): Promise<CreateDeliveryManUseCaseResponse> {
    const administrator = await this.administratorsRepository.findById(
      administratorId
    );

    if (!administrator) {
      return left(new AdministratorDoesNotExistError());
    }

    const passwordHash = await this.hashGenerator.hash(password);

    const deliveryMan = DeliveryMan.create({
      cpf,
      name,
      password: passwordHash,
      administratorId: administrator.id,
    });

    await this.deliveryMansRepository.create(deliveryMan);

    return right({});
  }
}
