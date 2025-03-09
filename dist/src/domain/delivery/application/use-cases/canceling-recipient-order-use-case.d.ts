import { Either } from '@/core/either';
import { OrdersRepository } from '../repositories/orders-repository';
import { OrderDoesNotExistError } from './errors/order-does-not-exist-error';
import { NotAllowedError } from '@/core/errors/not-allowed-error';
import { DeliveryMansRepository } from '../repositories/delivery-mans-repository';
import { DeliveryManDoesNotExistError } from './errors/delivery-man-does-not-exist-error';
interface CancelingRecipientOrderUseCaseRequest {
    deliveryManId: string;
    orderId: string;
}
type CancelingRecipientOrderUseCaseResponse = Either<DeliveryManDoesNotExistError | OrderDoesNotExistError | NotAllowedError, object>;
export declare class CancelingRecipientOrderUseCase {
    private readonly deliveryMansRepository;
    private readonly ordersRepository;
    constructor(deliveryMansRepository: DeliveryMansRepository, ordersRepository: OrdersRepository);
    execute({ deliveryManId, orderId, }: CancelingRecipientOrderUseCaseRequest): Promise<CancelingRecipientOrderUseCaseResponse>;
}
export {};
