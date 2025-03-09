import { Either } from '@/core/either';
import { DeliveryAddressDoesNotExistError } from './errors/delivery-address-does-not-exist-error';
import { RecipientDoesNotExistError } from './errors/recipient-does-not-exist-error';
import { OrdersRepository } from '../repositories/orders-repository';
import { DeliveryAddressRepository } from '../repositories/delivery-address-repository';
import { RecipientsRepository } from '../repositories/recipients-repository';
import { DeliveryMansRepository } from '../repositories/delivery-mans-repository';
import { OrderDoesNotExistError } from './errors/order-does-not-exist-error';
import { DeliveryManDoesNotExistError } from './errors/delivery-man-does-not-exist-error';
interface SendingOrderToRecipientByDeliveryManUseCaseRequest {
    deliveryManId: string;
    orderId: string;
}
type SendingOrderToRecipientByDeliveryManUseCaseResponse = Either<DeliveryManDoesNotExistError | OrderDoesNotExistError | RecipientDoesNotExistError | DeliveryAddressDoesNotExistError, object>;
export declare class SendingOrderToRecipientByDeliveryManUseCase {
    private readonly ordersRepository;
    private readonly deliveryMansRepository;
    private readonly deliveryAddressRepository;
    private readonly recipientsRepository;
    constructor(ordersRepository: OrdersRepository, deliveryMansRepository: DeliveryMansRepository, deliveryAddressRepository: DeliveryAddressRepository, recipientsRepository: RecipientsRepository);
    execute({ deliveryManId, orderId, }: SendingOrderToRecipientByDeliveryManUseCaseRequest): Promise<SendingOrderToRecipientByDeliveryManUseCaseResponse>;
}
export {};
