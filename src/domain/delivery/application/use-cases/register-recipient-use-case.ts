import { Either, left, right } from "@/core/either";

import { DeliveryAddressDoesNotExistError } from "./errors/delivery-address-does-not-exist-error";
import { RecipientDoesNotExistError } from "./errors/recipient-does-not-exist-error";
import { RecipientsRepository } from "../repositories/recipients-repository";
import { Recipient } from "../../enterprise/entities/recipient";
import { AdministratorsRepository } from "../repositories/administrators-repository";
import { AdministratorDoesNotExistError } from "./errors/administrator-does-not-exist-error";
import { WrongCredentialsError } from "./errors/wrong-credentials-error";

interface RegisterRecipientUseCaseRequest {
  name: string;
  email: string;
  administratorId: string;
}
type RegisterRecipientUseCaseResponse = Either<
  | AdministratorDoesNotExistError
  | DeliveryAddressDoesNotExistError
  | RecipientDoesNotExistError,
  {}
>;

export class RegisterRecipientUseCase {
  constructor(
    private readonly recipientsRepository: RecipientsRepository,
    private readonly administratorsRepository: AdministratorsRepository,
  ) {}

  async execute({
    name,
    email,
    administratorId,
  }: RegisterRecipientUseCaseRequest): Promise<RegisterRecipientUseCaseResponse> {
    const administratorDoesNotExists = !Boolean(
      await this.administratorsRepository.findById(administratorId),
    );
    if (administratorDoesNotExists) {
      return left(new AdministratorDoesNotExistError());
    }

    const emailAlreadyExists = Boolean(
      await this.recipientsRepository.findByEmail(email),
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
