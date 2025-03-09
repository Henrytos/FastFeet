import { Either } from '@/core/either';
import { AdministratorDoesNotExistError } from './errors/administrator-does-not-exist-error';
import { AdministratorsRepository } from '../repositories/administrators-repository';
import { OrdersRepository } from '../repositories/orders-repository';
import { Order } from '../../enterprise/entities/order';
interface FetchRecentOrderUseCaseRequest {
    page: number;
    perPage: number;
    administratorId: string;
}
type FetchRecentOrderUseCaseResponse = Either<AdministratorDoesNotExistError, {
    orders: Order[];
}>;
export declare class FetchRecentOrderUseCase {
    private readonly administratorsRepository;
    private readonly ordersRepository;
    constructor(administratorsRepository: AdministratorsRepository, ordersRepository: OrdersRepository);
    execute({ page, perPage, administratorId, }: FetchRecentOrderUseCaseRequest): Promise<FetchRecentOrderUseCaseResponse>;
}
export {};
