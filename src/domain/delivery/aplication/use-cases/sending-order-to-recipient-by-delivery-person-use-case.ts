import { Either, left, right } from "@/core/either";

import { AdministratorDoesNotExistError } from "./errors/administrator-does-not-exist-error";
import { AdministratorsRepository } from "../repositories/administrators-repository";
import { DeliveryAddressDoesNotExistError } from "./errors/delivery-address-does-not-exist-error";
import { RecipientDoesNotExistError } from "./errors/recipient-does-not-exist-error";
import { OrdersRepository } from "../repositories/orders-repository";
import { DeliveryAddressRepository } from "../repositories/delivery-address-repository";
import { RecipientsRepository } from "../repositories/recipients-repositorys";
import { Order } from "../../enterprise/entites/order";
import { DeliveryMansRepository } from "../repositories/delivery-mans-repository";

interface SendingOrderToRecipientByDeliveryManUseCaseRequest {
  administratorId: string;
  deliveryManId: string;
  orderId: string;
}
type SendingOrderToRecipientByDeliveryManUseCaseResponse = Either<
  | AdministratorDoesNotExistError
  | RecipientDoesNotExistError
  | DeliveryAddressDoesNotExistError,
  {}
>;

export class SendingOrderToRecipientByDeliveryManUseCase {
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
    orderId,
  }: SendingOrderToRecipientByDeliveryManUseCaseRequest): Promise<SendingOrderToRecipientByDeliveryManUseCaseResponse> {
    const administrator = await this.administratorsRepository.findById(
      administratorId
    );
    if (!administrator) {
      return left(new AdministratorDoesNotExistError());
    }

    const recipient = await this.recipientsRepository.findById(recipientId);
    if (!recipient) {
      return left(new RecipientDoesNotExistError());
    }

    const deliveryAddress = await this.deliveryAddressRepository.findById(
      recipient.deliveryAddressId.toValue()
    );
    if (!deliveryAddress) {
      return left(new DeliveryAddressDoesNotExistError());
    }

    return right({});
  }
}
