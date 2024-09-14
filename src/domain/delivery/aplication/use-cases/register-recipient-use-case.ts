import { Either, left, right } from "@/core/either";

import { DeliveryAddressDoesNotExistError } from "./errors/delivery-address-does-not-exist-error";
import { RecipientDoesNotExistError } from "./errors/recipient-does-not-exist-error";
import { DeliveryAddressRepository } from "../repositories/delivery-address-repository";
import { RecipientsRepository } from "../repositories/recipients-repositorys";
import { Recipient } from "../../enterprise/entites/recipient";
import { AdministratorsRepository } from "../repositories/administrators-repository";
import { AdministratorDoesNotExistError } from "./errors/administrator-does-not-exist-error";
import { WrongCredentialsError } from "./errors/wrong-credentials-error";

interface RegisterRecipientUseCaseRequest {
  name: string;
  email: string;
  aministratorId: string;
}
type RegisterRecipientUseCaseResponse = Either<
  | AdministratorDoesNotExistError
  | DeliveryAddressDoesNotExistError
  | RecipientDoesNotExistError,
  {}
>;

export class RegisterRecipientUseCase {
  constructor(
    private recipientsRepository: RecipientsRepository,
    private deliveryAddressRepository: DeliveryAddressRepository,
    private administratorsRepository: AdministratorsRepository
  ) {}

  async execute({
    name,
    email,
    aministratorId,
  }: RegisterRecipientUseCaseRequest): Promise<RegisterRecipientUseCaseResponse> {
    const administratorDoesNotExists = !Boolean(
      await this.administratorsRepository.findById(aministratorId)
    );
    if (administratorDoesNotExists) {
      return left(new AdministratorDoesNotExistError());
    }

    const emailAlreadyExists = Boolean(
      await this.recipientsRepository.findByEmail(email)
    );
    if (emailAlreadyExists) {
      return left(new WrongCredentialsError());
    }

    const recipient = Recipient.create({
      email,
      name,
    });

    await this.recipientsRepository.create(recipient);

    return right({});
  }
}
