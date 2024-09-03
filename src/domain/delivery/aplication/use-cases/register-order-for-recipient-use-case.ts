import { Either, left, right } from "@/core/either";
import { DeliveryMansRepository } from "../repositories/delivery-mans-repository";
import { AdministratorDoesNotExistError } from "./errors/administrator-does-not-exist-error";
import { AdministratorsRepository } from "../repositories/administrators-repository";
import { DeliveryAddressDoesNotExistError } from "./errors/delivery-address-does-not-exist-error";
import { RecipientDoesNotExistError } from "./errors/recipient-does-not-exist-error";
import { OrdersRepository } from "../repositories/orders-repository";
import { DeliveryAddressRepository } from "../repositories/delivery-address-repository";
import { RecipientsRepository } from "../repositories/recipients-repositorys";
import { DeliveryManDoesNotExistError } from "./errors/delivery-man-does-not-exist-error";
import { Order } from "../../enterprise/entites/order";

interface RegisterOrderForRecipientUseCaseRequest {
  deliveryManId: string;
  administratorId: string;
  deliveryAddressId: string;
  recipientId: string;
}
type RegisterOrderForRecipientUseCaseResponse = Either<
  | AdministratorDoesNotExistError
  | DeliveryManDoesNotExistError
  | RecipientDoesNotExistError
  | DeliveryAddressDoesNotExistError,
  {}
>;

export class RegisterOrderForRecipientUseCase {
  constructor(
    private ordersRepository: OrdersRepository,
    private administratorsRepository: AdministratorsRepository,
    private deliveryMansRepository: DeliveryMansRepository,
    private deliveryAddressRepository: DeliveryAddressRepository,
    private recipientsRepository: RecipientsRepository
  ) {}

  async execute({
    administratorId,
    deliveryManId,
    deliveryAddressId,
    recipientId,
  }: RegisterOrderForRecipientUseCaseRequest): Promise<RegisterOrderForRecipientUseCaseResponse> {
    const administrator = await this.administratorsRepository.findById(
      administratorId
    );
    if (!administrator) {
      return left(new AdministratorDoesNotExistError());
    }

    const delivereMan = await this.deliveryMansRepository.findById(
      deliveryManId
    );
    if (!delivereMan) {
      return left(new DeliveryManDoesNotExistError());
    }

    const recipient = await this.recipientsRepository.findById(recipientId);
    if (!recipient) {
      return left(new RecipientDoesNotExistError());
    }

    const deliveryAddress = await this.deliveryAddressRepository.findById(
      deliveryAddressId
    );
    if (!deliveryAddress) {
      return left(new DeliveryAddressDoesNotExistError());
    }

    const newOrderForRecipient = Order.create({
      status: "pending",
      recipientId: recipient.id,
    });

    this.ordersRepository.create(newOrderForRecipient);
    return right({});
  }
}
