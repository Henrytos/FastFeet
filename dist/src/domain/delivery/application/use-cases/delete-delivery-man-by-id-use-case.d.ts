import { Either } from '@/core/either';
import { DeliveryMansRepository } from '../repositories/delivery-mans-repository';
import { DeliveryManDoesNotExistError } from './errors/delivery-man-does-not-exist-error';
import { WrongCredentialsError } from './errors/wrong-credentials-error';
import { AdministratorsRepository } from '../repositories/administrators-repository';
interface DeleteDeliveryManByIdUseCaseRequest {
    deliveryManId: string;
    administratorId: string;
}
type DeleteDeliveryManByIdUseCaseResponse = Either<DeliveryManDoesNotExistError | WrongCredentialsError, object>;
export declare class DeleteDeliveryManByIdUseCase {
    private readonly administratorsRepository;
    private readonly deliveryMansRepository;
    constructor(administratorsRepository: AdministratorsRepository, deliveryMansRepository: DeliveryMansRepository);
    execute({ deliveryManId, administratorId, }: DeleteDeliveryManByIdUseCaseRequest): Promise<DeleteDeliveryManByIdUseCaseResponse>;
}
export {};
