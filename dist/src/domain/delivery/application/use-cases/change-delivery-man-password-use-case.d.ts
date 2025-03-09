import { Either } from '@/core/either';
import { HashGenerator } from '../cryptography/hash-generator';
import { AdministratorsRepository } from '../repositories/administrators-repository';
import { DeliveryMansRepository } from '../repositories/delivery-mans-repository';
import { AdministratorDoesNotExistError } from './errors/administrator-does-not-exist-error';
import { DeliveryManDoesNotExistError } from './errors/delivery-man-does-not-exist-error';
interface ChangeDeliveryManPasswordUseCaseRequest {
    administratorId: string;
    cpf: string;
    password: string;
}
type ChangeDeliveryManPasswordUseCaseResponse = Either<AdministratorDoesNotExistError | DeliveryManDoesNotExistError, object>;
export declare class ChangeDeliveryManPasswordUseCase {
    private readonly administratorsRepository;
    private readonly deliveryMansRepository;
    private readonly hashGenerator;
    constructor(administratorsRepository: AdministratorsRepository, deliveryMansRepository: DeliveryMansRepository, hashGenerator: HashGenerator);
    execute({ administratorId, cpf, password, }: ChangeDeliveryManPasswordUseCaseRequest): Promise<ChangeDeliveryManPasswordUseCaseResponse>;
}
export {};
