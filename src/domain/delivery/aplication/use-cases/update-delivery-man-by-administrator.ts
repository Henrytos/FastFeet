import { Either, left, right } from "@/core/either";
import { DeliveryMansRepository } from "../repositories/delivery-mans-repository";
import { AdministratorDoesNotExistError } from "./errors/administrator-does-not-exist-error";
import { DeliveryManDoesNotExistError } from "./errors/delivery-man-does-not-exist-error";
import { WrongCredentialsError } from "./errors/wrong-credentials-error";
import { DeliveryMan } from "../../enterprise/entites/delivery-man";
import { UnqiueEntityID } from "@/core/entities/unique-entity-id";
import { HashGenerator } from "../cryptography/hash-generator";

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
    private deliveryMansRepository: DeliveryMansRepository,
    private hashGenerator: HashGenerator
  ) {}

  async execute({
    deliveryManId,
    administratorId,
    cpf,
    name,
    password,
  }: UpdateDeliveryManByAdministratorUseCaseRequest): Promise<UpdateDeliveryManByAdministratorUseCaseResponse> {
    const deliveryMan = await this.deliveryMansRepository.findById(
      deliveryManId
    );
    if (!deliveryMan) {
      return left(new DeliveryManDoesNotExistError());
    }

    if (deliveryMan.administratorId.toString() != administratorId) {
      return left(new WrongCredentialsError());
    }

    const passwordHash = await this.hashGenerator.hash(password);
    const updatedDeliveryMan = DeliveryMan.create(
      {
        administratorId: new UnqiueEntityID(administratorId),
        cpf,
        name,
        password: passwordHash,
      },
      deliveryMan.id
    );

    await this.deliveryMansRepository.save(updatedDeliveryMan);
    return right({});
  }
}
