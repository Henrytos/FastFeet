import { Either, left, right } from "@/core/either";

import { DeliveryAddressDoesNotExistError } from "./errors/delivery-address-does-not-exist-error";
import { RecipientDoesNotExistError } from "./errors/recipient-does-not-exist-error";
import { DeliveryAddressRepository } from "../repositories/delivery-address-repository";
import { RecipientsRepository } from "../repositories/recipients-repositorys";
import { Recipient } from "../../enterprise/entites/recipient";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { AdministratorsRepository } from "../repositories/administrators-repository";
import { AdministratorDoesNotExistError } from "./errors/administrator-does-not-exist-error";

interface RegisterRecipientUseCaseRequest {
  name: string;
  email: string;
  addressId: string;
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
    private deliveryAddressRepository: DeliveryAddressRepository,
    private recipientsRepository: RecipientsRepository,
    private administratorsRepository: AdministratorsRepository
  ) {}

  async execute({
    name,
    email,
    addressId,
    aministratorId,
  }: RegisterRecipientUseCaseRequest): Promise<RegisterRecipientUseCaseResponse> {
    const administratorDoesNotExists = !Boolean(
      await this.administratorsRepository.findById(aministratorId)
    );

    if (administratorDoesNotExists) {
      return left(new AdministratorDoesNotExistError());
    }

    const addressDoesNotExist = !Boolean(
      await this.deliveryAddressRepository.findById(addressId)
    );
    if (addressDoesNotExist) {
      return left(new DeliveryAddressDoesNotExistError());
    }

    const recipient = Recipient.create({
      email,
      name,
      deliveryAddressId: new UniqueEntityID(addressId),
    });

    await this.recipientsRepository.create(recipient);

    return right({});
  }
}
