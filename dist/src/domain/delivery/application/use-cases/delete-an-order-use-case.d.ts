import { Either } from '@/core/either';
import { OrderDoesNotExistError } from './errors/order-does-not-exist-error';
import { AdministratorDoesNotExistError } from './errors/administrator-does-not-exist-error';
import { OrdersRepository } from '../repositories/orders-repository';
import { AdministratorsRepository } from '../repositories/administrators-repository';
interface DeleteAnOrderUseCaseRequest {
    orderId: string;
    administratorId: string;
}
type DeleteAnOrderUseCaseResponse = Either<OrderDoesNotExistError | AdministratorDoesNotExistError, object>;
export declare class DeleteAnOrderUseCase {
    private readonly ordersRepository;
    private readonly administratorsRepository;
    constructor(ordersRepository: OrdersRepository, administratorsRepository: AdministratorsRepository);
    execute({ orderId, administratorId, }: DeleteAnOrderUseCaseRequest): Promise<DeleteAnOrderUseCaseResponse>;
}
export {};
