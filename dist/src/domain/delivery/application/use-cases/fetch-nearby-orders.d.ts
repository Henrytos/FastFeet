import { Either } from '@/core/either';
import { OrdersRepository } from '../repositories/orders-repository';
import { OrderWithDistance } from '../../enterprise/entities/value-object/order-with-distance';
import { DeliveryMansRepository } from '../repositories/delivery-mans-repository';
import { DeliveryManDoesNotExistError } from './errors/delivery-man-does-not-exist-error';
interface FetchNearbyOrdersWithDistanceUseCaseRequest {
    from: {
        deliveryManLongitude: number;
        deliveryManLatitude: number;
    };
    page: number;
    deliveryManId: string;
}
type FetchNearbyOrdersWithDistanceUseCaseResponse = Either<DeliveryManDoesNotExistError, {
    ordersWithDistance: OrderWithDistance[];
}>;
export declare class FetchNearbyOrdersWithDistanceUseCase {
    private readonly deliveryMansRepository;
    private readonly ordersRepository;
    constructor(deliveryMansRepository: DeliveryMansRepository, ordersRepository: OrdersRepository);
    execute({ from, page, deliveryManId, }: FetchNearbyOrdersWithDistanceUseCaseRequest): Promise<FetchNearbyOrdersWithDistanceUseCaseResponse>;
}
export {};
