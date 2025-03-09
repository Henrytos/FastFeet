import { Either } from '@/core/either';
import { RecipientDoesNotExistError } from './errors/recipient-does-not-exist-error';
import { OrdersRepository } from '../repositories/orders-repository';
import { RecipientsRepository } from '../repositories/recipients-repository';
import { Order } from '../../enterprise/entities/order';
interface FetchOrderByRecipientIdUseCaseRequest {
    recipientId: string;
    page: number;
}
type FetchOrderByRecipientIdUseCaseResponse = Either<RecipientDoesNotExistError, {
    orders: Order[];
}>;
export declare class FetchOrderByRecipientIdUseCase {
    private readonly recipientsRepository;
    private readonly ordersRepository;
    constructor(recipientsRepository: RecipientsRepository, ordersRepository: OrdersRepository);
    execute({ recipientId, page, }: FetchOrderByRecipientIdUseCaseRequest): Promise<FetchOrderByRecipientIdUseCaseResponse>;
}
export {};
