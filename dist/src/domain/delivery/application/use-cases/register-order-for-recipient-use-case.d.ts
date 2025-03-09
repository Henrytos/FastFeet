import { Either } from '@/core/either';
import { AdministratorDoesNotExistError } from './errors/administrator-does-not-exist-error';
import { AdministratorsRepository } from '@/domain/delivery/application/repositories/administrators-repository';
import { DeliveryAddressDoesNotExistError } from './errors/delivery-address-does-not-exist-error';
import { RecipientDoesNotExistError } from './errors/recipient-does-not-exist-error';
import { OrdersRepository } from '@/domain/delivery/application/repositories/orders-repository';
import { DeliveryAddressRepository } from '@/domain/delivery/application/repositories/delivery-address-repository';
import { RecipientsRepository } from '@/domain/delivery/application/repositories/recipients-repository';
interface RegisterOrderForRecipientUseCaseRequest {
    administratorId: string;
    recipientId: string;
    deliveryAddressId: string;
}
type RegisterOrderForRecipientUseCaseResponse = Either<AdministratorDoesNotExistError | RecipientDoesNotExistError | DeliveryAddressDoesNotExistError, object>;
export declare class RegisterOrderForRecipientUseCase {
    private readonly ordersRepository;
    private readonly administratorsRepository;
    private readonly deliveryAddressRepository;
    private readonly recipientsRepository;
    constructor(ordersRepository: OrdersRepository, administratorsRepository: AdministratorsRepository, deliveryAddressRepository: DeliveryAddressRepository, recipientsRepository: RecipientsRepository);
    execute({ administratorId, recipientId, deliveryAddressId, }: RegisterOrderForRecipientUseCaseRequest): Promise<RegisterOrderForRecipientUseCaseResponse>;
}
export {};
