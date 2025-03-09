import { Either } from '@/core/either';
import { OrdersRepository } from '../repositories/orders-repository';
import { OrderDoesNotExistError } from './errors/order-does-not-exist-error';
import { DeliveryMansRepository } from '../repositories/delivery-mans-repository';
import { DeliveryManDoesNotExistError } from './errors/delivery-man-does-not-exist-error';
import { WrongCredentialsError } from './errors/wrong-credentials-error';
import { PhotosRepository } from '../repositories/photos-repository';
import { PhotoDoesNotExistError } from './errors/photo-does-not-exist-error';
export interface MarkAnOrderAsDeliveredUseCaseRequest {
    orderId: string;
    deliveryManId: string;
    photoId: string;
}
export type MarkAnOrderAsDeliveredUseCaseResponse = Either<OrderDoesNotExistError | PhotoDoesNotExistError | DeliveryManDoesNotExistError | WrongCredentialsError, object>;
export declare class MarkAnOrderAsDeliveredUseCase {
    private readonly ordersRepository;
    private readonly deliveryMansRepository;
    private readonly photosRepository;
    constructor(ordersRepository: OrdersRepository, deliveryMansRepository: DeliveryMansRepository, photosRepository: PhotosRepository);
    execute({ orderId, deliveryManId, photoId, }: MarkAnOrderAsDeliveredUseCaseRequest): Promise<MarkAnOrderAsDeliveredUseCaseResponse>;
}
