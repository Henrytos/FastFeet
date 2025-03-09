import { Either } from '@/core/either';
import { AdministratorsRepository } from '../repositories/administrators-repository';
import { HashGenerator } from '../cryptography/hash-generator';
import { Administrator } from '../../enterprise/entities/administrator';
import { WrongCredentialsError } from './errors/wrong-credentials-error';
interface AdministratorRegistrationUseCaseRe {
    name: string;
    cpf: string;
    password: string;
}
type AdministratorsRepositoryResponse = Either<WrongCredentialsError, {
    administrator: Administrator;
}>;
export declare class AdministratorRegistrationUseCase {
    private readonly administratorsRepository;
    private readonly hashGenerator;
    constructor(administratorsRepository: AdministratorsRepository, hashGenerator: HashGenerator);
    execute({ name, cpf, password, }: AdministratorRegistrationUseCaseRe): Promise<AdministratorsRepositoryResponse>;
}
export {};
