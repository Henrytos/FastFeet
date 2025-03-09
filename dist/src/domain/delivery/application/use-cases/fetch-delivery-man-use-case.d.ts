import { Either } from '@/core/either';
import { DeliveryMansRepository } from '../repositories/delivery-mans-repository';
import { DeliveryMan } from '../../enterprise/entities/delivery-man';
import { AdministratorsRepository } from '../repositories/administrators-repository';
import { AdministratorDoesNotExistError } from './errors/administrator-does-not-exist-error';
interface FetchDeliveryMansUseCaseRequest {
    page: number;
    perPage: number;
    administratorId: string;
}
type FetchDeliveryMansUseCaseResponse = Either<AdministratorDoesNotExistError, {
    deliveryMans: DeliveryMan[];
}>;
export declare class FetchDeliveryMansUseCase {
    private readonly deliveryMansRepository;
    private readonly administratorsRepository;
    constructor(deliveryMansRepository: DeliveryMansRepository, administratorsRepository: AdministratorsRepository);
    execute({ page, perPage, administratorId, }: FetchDeliveryMansUseCaseRequest): Promise<FetchDeliveryMansUseCaseResponse>;
}
export {};
