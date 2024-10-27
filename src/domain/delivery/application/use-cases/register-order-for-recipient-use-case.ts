import { Either, left, right } from '@/core/either';

import { AdministratorDoesNotExistError } from './errors/administrator-does-not-exist-error';
import { AdministratorsRepository } from '@/domain/delivery/application/repositories/administrators-repository';
import { DeliveryAddressDoesNotExistError } from './errors/delivery-address-does-not-exist-error';
import { RecipientDoesNotExistError } from './errors/recipient-does-not-exist-error';
import { OrdersRepository } from '@/domain/delivery/application/repositories/orders-repository';
import { DeliveryAddressRepository } from '@/domain/delivery/application/repositories/delivery-address-repository';
import { RecipientsRepository } from '@/domain/delivery/application/repositories/recipients-repository';
import { Order } from '@/domain/delivery/enterprise/entities/order';
import { ORDER_STATUS } from '@/core/entities/order-status.enum';

interface RegisterOrderForRecipientUseCaseRequest {
  administratorId: string;
  recipientId: string;
  deliveryAddressId: string;
}
type RegisterOrderForRecipientUseCaseResponse = Either<
  | AdministratorDoesNotExistError
  | RecipientDoesNotExistError
  | DeliveryAddressDoesNotExistError,
  {}
>;

export class RegisterOrderForRecipientUseCase {
  constructor(
    private ordersRepository: OrdersRepository,
    private administratorsRepository: AdministratorsRepository,
    private deliveryAddressRepository: DeliveryAddressRepository,
    private recipientsRepository: RecipientsRepository,
  ) {}

  async execute({
    administratorId,
    recipientId,
    deliveryAddressId,
  }: RegisterOrderForRecipientUseCaseRequest): Promise<RegisterOrderForRecipientUseCaseResponse> {
    const administrator =
      await this.administratorsRepository.findById(administratorId);
    if (!administrator) {
      return left(new AdministratorDoesNotExistError());
    }

    const recipient = await this.recipientsRepository.findById(recipientId);
    if (!recipient) {
      return left(new RecipientDoesNotExistError());
    }

    const deliveryAddress =
      await this.deliveryAddressRepository.findById(deliveryAddressId);
    if (!deliveryAddress) {
      return left(new DeliveryAddressDoesNotExistError());
    }

    const newOrderForRecipient = Order.create({
      status: ORDER_STATUS.PENDING,
      recipientId: recipient.id,
    });

    this.ordersRepository.create(newOrderForRecipient);
    return right({});
  }
}
