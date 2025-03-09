import { ORDER_STATUS } from '@/core/constants/order-status.enum';
import { Either } from '@/core/either';
import { OrderDoesNotExistError } from './errors/order-does-not-exist-error';
import { AdministratorDoesNotExistError } from './errors/administrator-does-not-exist-error';
import { DeliveryManDoesNotExistError } from './errors/delivery-man-does-not-exist-error';
import { Order } from '../../enterprise/entities/order';
import { AdministratorsRepository } from '../repositories/administrators-repository';
import { DeliveryMansRepository } from '../repositories/delivery-mans-repository';
import { OrdersRepository } from '../repositories/orders-repository';
interface UpdateOrderUseCaseRequest {
    orderId: string;
    administratorId: string;
    deliveryManId: string;
    status: ORDER_STATUS;
    deliveryAt: Date;
    withdrawnAt: Date;
}
type UpdateOrderUseCaseResponse = Either<OrderDoesNotExistError | AdministratorDoesNotExistError | DeliveryManDoesNotExistError, {
    order: Order;
}>;
export declare class UpdateOrderUseCase {
    private readonly ordersRepository;
    private readonly administratorsRepository;
    private readonly deliveryMansRepository;
    constructor(ordersRepository: OrdersRepository, administratorsRepository: AdministratorsRepository, deliveryMansRepository: DeliveryMansRepository);
    execute({ orderId, administratorId, deliveryManId, status, deliveryAt, withdrawnAt, }: UpdateOrderUseCaseRequest): Promise<UpdateOrderUseCaseResponse>;
}
export {};
