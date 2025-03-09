import { Either } from '@/core/either';
import { RecipientsRepository } from '../repositories/recipients-repository';
import { Recipient } from '../../enterprise/entities/recipient';
import { AdministratorDoesNotExistError } from './errors/administrator-does-not-exist-error';
import { AdministratorsRepository } from '../repositories/administrators-repository';
interface FetchRecipientUseCaseRequest {
    administratorId: string;
    page: number;
    perPage: number;
}
type FetchRecipientUseCaseResponse = Either<AdministratorDoesNotExistError, {
    recipients: Recipient[];
}>;
export declare class FetchRecipientUseCase {
    private readonly recipientsRepository;
    private readonly administratorsRepository;
    constructor(recipientsRepository: RecipientsRepository, administratorsRepository: AdministratorsRepository);
    execute({ administratorId, page, perPage, }: FetchRecipientUseCaseRequest): Promise<FetchRecipientUseCaseResponse>;
}
export {};
