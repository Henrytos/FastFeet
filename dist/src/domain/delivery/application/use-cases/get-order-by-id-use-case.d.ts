import { Either } from '@/core/either';
import { OrderDoesNotExistError } from './errors/order-does-not-exist-error';
import { OrdersRepository } from '../repositories/orders-repository';
import { OrderWithDetails } from '../../enterprise/entities/value-object/order-with-details';
interface GetOrderByIdUseCaseRequest {
    orderId: string;
}
type GetOrderByIdUseCaseResponse = Either<OrderDoesNotExistError, {
    orderWithDetails: OrderWithDetails;
}>;
export declare class GetOrderByIdUseCase {
    private readonly ordersRepository;
    constructor(ordersRepository: OrdersRepository);
    execute({ orderId, }: GetOrderByIdUseCaseRequest): Promise<GetOrderByIdUseCaseResponse>;
}
export {};
