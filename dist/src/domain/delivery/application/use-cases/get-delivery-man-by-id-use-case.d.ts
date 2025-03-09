import { Either } from '@/core/either';
import { DeliveryMansRepository } from '../repositories/delivery-mans-repository';
import { DeliveryManDoesNotExistError } from './errors/delivery-man-does-not-exist-error';
import { DeliveryMan } from '../../enterprise/entities/delivery-man';
interface GetDeliveryManByIdUseCaseRequest {
    deliveryManId: string;
}
type GetDeliveryManByIdUseCaseResponse = Either<DeliveryManDoesNotExistError, {
    deliveryMan: DeliveryMan;
}>;
export declare class GetDeliveryManByIdUseCase {
    private readonly deliveryMansRepository;
    constructor(deliveryMansRepository: DeliveryMansRepository);
    execute({ deliveryManId, }: GetDeliveryManByIdUseCaseRequest): Promise<GetDeliveryManByIdUseCaseResponse>;
}
export {};
