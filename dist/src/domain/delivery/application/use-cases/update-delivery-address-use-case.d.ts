import { Either } from '@/core/either';
import { DeliveryAddressRepository } from '../repositories/delivery-address-repository';
import { DeliveryAddressDoesNotExistError } from './errors/delivery-address-does-not-exist-error';
import { AdministratorsRepository } from '../repositories/administrators-repository';
import { AdministratorDoesNotExistError } from './errors/administrator-does-not-exist-error';
interface UpdateDeliveryAddressUseCaseRequest {
    administratorId: string;
    deliveryAddressId: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    zip: string;
    number: string;
    latitude: number;
    longitude: number;
}
type UpdateDeliveryAddressUseCaseResponse = Either<DeliveryAddressDoesNotExistError | AdministratorDoesNotExistError, object>;
export declare class UpdateDeliveryAddressUseCase {
    private readonly administratorsRepository;
    private readonly deliveryAddressRepository;
    constructor(administratorsRepository: AdministratorsRepository, deliveryAddressRepository: DeliveryAddressRepository);
    execute({ administratorId, deliveryAddressId, state, city, neighborhood, street, zip, number, latitude, longitude, }: UpdateDeliveryAddressUseCaseRequest): Promise<UpdateDeliveryAddressUseCaseResponse>;
}
export {};
