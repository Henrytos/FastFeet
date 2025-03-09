import { Either } from '@/core/either';
import { DeliveryMansRepository } from '../repositories/delivery-mans-repository';
import { AdministratorDoesNotExistError } from './errors/administrator-does-not-exist-error';
import { HashGenerator } from '../cryptography/hash-generator';
import { AdministratorsRepository } from '../repositories/administrators-repository';
interface UpdateDeliveryManByAdministratorUseCaseRequest {
    deliveryManId: string;
    administratorId: string;
    cpf: string;
    name: string;
    password: string;
}
type UpdateDeliveryManByAdministratorUseCaseResponse = Either<AdministratorDoesNotExistError, object>;
export declare class UpdateDeliveryManByAdministratorUseCase {
    private readonly administratorsRepository;
    private readonly deliveryMansRepository;
    private readonly hashGenerator;
    constructor(administratorsRepository: AdministratorsRepository, deliveryMansRepository: DeliveryMansRepository, hashGenerator: HashGenerator);
    execute({ deliveryManId, administratorId, cpf, name, password, }: UpdateDeliveryManByAdministratorUseCaseRequest): Promise<UpdateDeliveryManByAdministratorUseCaseResponse>;
}
export {};
