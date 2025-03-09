import { Either } from '@/core/either';
import { AdministratorsRepository } from '../repositories/administrators-repository';
import { DeliveryAddressRepository } from '../repositories/delivery-address-repository';
import { AdministratorDoesNotExistError } from './errors/administrator-does-not-exist-error';
import { DeliveryAddress } from '../../enterprise/entities/delivery-address';
interface RegisterDeliveryAddressUseCaseRequest {
    administratorId: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    zip: string;
    number: string;
    latitude: number;
    longitude: number;
}
type RegisterDeliveryAddressUseCaseResponse = Either<AdministratorDoesNotExistError, {
    deliveryAddress: DeliveryAddress;
}>;
export declare class RegisterDeliveryAddressUseCase {
    private readonly administratorsRepository;
    private readonly deliveryAddressRepository;
    constructor(administratorsRepository: AdministratorsRepository, deliveryAddressRepository: DeliveryAddressRepository);
    execute({ administratorId, state, city, neighborhood, street, zip, number, latitude, longitude, }: RegisterDeliveryAddressUseCaseRequest): Promise<RegisterDeliveryAddressUseCaseResponse>;
}
export {};
