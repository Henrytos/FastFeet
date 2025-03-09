import { Either } from '@/core/either';
import { Encrypter } from '../cryptography/encrypter';
import { HashComparer } from '../cryptography/hash-comparer';
import { WrongCredentialsError } from './errors/wrong-credentials-error';
import { DeliveryMansRepository } from '../repositories/delivery-mans-repository';
import { AdministratorsRepository } from '../repositories/administrators-repository';
interface AuthenticateUserUseCaseRequest {
    cpf: string;
    password: string;
}
type AuthenticateUserUseCaseResponse = Either<WrongCredentialsError, {
    accessToken: string;
}>;
export declare class AuthenticateUserUseCase {
    private readonly deliveryMansRepository;
    private readonly administratorsRepository;
    private readonly encrypter;
    private readonly hashComparer;
    constructor(deliveryMansRepository: DeliveryMansRepository, administratorsRepository: AdministratorsRepository, encrypter: Encrypter, hashComparer: HashComparer);
    execute({ cpf, password, }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse>;
}
export {};
