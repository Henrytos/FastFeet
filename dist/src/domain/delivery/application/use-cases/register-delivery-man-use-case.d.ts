import { Either } from '@/core/either';
import { AdministratorsRepository } from '../repositories/administrators-repository';
import { DeliveryMansRepository } from '../repositories/delivery-mans-repository';
import { AdministratorDoesNotExistError } from './errors/administrator-does-not-exist-error';
import { HashGenerator } from '../cryptography/hash-generator';
import { WrongCredentialsError } from './errors/wrong-credentials-error';
interface RegisterDeliveryManUseCaseRequest {
    cpf: string;
    name: string;
    password: string;
    administratorId: string;
}
type RegisterDeliveryManUseCaseResponse = Either<AdministratorDoesNotExistError | WrongCredentialsError, object>;
export declare class RegisterDeliveryManUseCase {
    private readonly administratorsRepository;
    private readonly deliveryMansRepository;
    private readonly hashGenerator;
    constructor(administratorsRepository: AdministratorsRepository, deliveryMansRepository: DeliveryMansRepository, hashGenerator: HashGenerator);
    execute({ cpf, name, password, administratorId, }: RegisterDeliveryManUseCaseRequest): Promise<RegisterDeliveryManUseCaseResponse>;
}
export {};
