import { Either } from '@/core/either';
import { OrdersRepository } from '../repositories/orders-repository';
import { Order } from '../../enterprise/entities/order';
import { DeliveryMansRepository } from '../repositories/delivery-mans-repository';
import { DeliveryManDoesNotExistError } from './errors/delivery-man-does-not-exist-error';
interface FetchOrderByDeliveryManIdUseCaseRequest {
    deliveryManId: string;
    page: number;
    perPage: number;
}
type FetchOrderByDeliveryManIdUseCaseResponse = Either<DeliveryManDoesNotExistError, {
    orders: Order[];
}>;
export declare class FetchOrderByDeliveryManIdUseCase {
    private readonly ordersRepository;
    private readonly deliveryMansRepository;
    constructor(ordersRepository: OrdersRepository, deliveryMansRepository: DeliveryMansRepository);
    execute({ deliveryManId, page, perPage, }: FetchOrderByDeliveryManIdUseCaseRequest): Promise<FetchOrderByDeliveryManIdUseCaseResponse>;
}
export {};
