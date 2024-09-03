import { Either, right } from "@/core/either";
import { DeliveryMansRepository } from "../repositories/delivery-mans-repository";
import { AdministratorDoesNotExistError } from "./errors/administrator-does-not-exist-error";
import { HashGenerator } from "../cryptography/hash-generator";
import { AdministratorsRepository } from "../repositories/administrators-repository";

interface RegisterOrderForRecipientUseCaseRequest {
  deliveryManId: string;
  administratorId: string;
  deliveryAddressId: string;
  recipientId: string;
}
type RegisterOrderForRecipientUseCaseResponse = Either<
  AdministratorDoesNotExistError,
  {}
>;

export class RegisterOrderForRecipientUseCase {
  constructor() {}

  async execute({
    deliveryManId,
    administratorId,
    recipientId,
  }: RegisterOrderForRecipientUseCaseRequest): Promise<RegisterOrderForRecipientUseCaseResponse> {
    return right({});
  }
}
