import { Either, left, right } from '@/core/either';

import { AdministratorDoesNotExistError } from './errors/administrator-does-not-exist-error';
import { AdministratorsRepository } from '../repositories/administrators-repository';
import { DeliveryAddressDoesNotExistError } from './errors/delivery-address-does-not-exist-error';
import { RecipientDoesNotExistError } from './errors/recipient-does-not-exist-error';
import { OrdersRepository } from '../repositories/orders-repository';
import { DeliveryAddressRepository } from '../repositories/delivery-address-repository';
import { RecipientsRepository } from '../repositories/recipients-repository';
import { DeliveryMansRepository } from '../repositories/delivery-mans-repository';
import { OrderDoesNotExistError } from './errors/order-does-not-exist-error';
import { DeliveryManDoesNotExistError } from './errors/delivery-man-does-not-exist-error';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

interface SendingOrderToRecipientByDeliveryManUseCaseRequest {
  administratorId: string;
  deliveryManId: string;
  orderId: string;
}
type SendingOrderToRecipientByDeliveryManUseCaseResponse = Either<
  | AdministratorDoesNotExistError
  | DeliveryManDoesNotExistError
  | OrderDoesNotExistError
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
    private recipientsRepository: RecipientsRepository,
  ) {}

  async execute({
    administratorId,
    deliveryManId,
    orderId,
  }: SendingOrderToRecipientByDeliveryManUseCaseRequest): Promise<SendingOrderToRecipientByDeliveryManUseCaseResponse> {
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

    const order = await this.ordersRepository.findById(orderId);
    if (!order) {
      return left(new OrderDoesNotExistError());
    }

    const recipient = await this.recipientsRepository.findById(
      order.recipientId.toString(),
    );
    if (!recipient) {
      return left(new RecipientDoesNotExistError());
    }

    if (!order.deliveryAddressId) {
      return left(new DeliveryAddressDoesNotExistError());
    }

    const deliveryAddress = await this.deliveryAddressRepository.findById(
      order.deliveryAddressId.toString(),
    );

    if (!deliveryAddress) {
      return left(new DeliveryAddressDoesNotExistError());
    }

    order.status = 'withdrawn';
    order.deliveryManId = deliveryMan.id;
    order.withdrawnAt = new Date();
    order.deliveryAddressId = deliveryAddress.id;

    this.ordersRepository.save(order);

    return right({});
  }
}
