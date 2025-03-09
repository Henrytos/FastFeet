import { Either } from '@/core/either';
import { RecipientDoesNotExistError } from './errors/recipient-does-not-exist-error';
import { Recipient } from '../../enterprise/entities/recipient';
import { RecipientsRepository } from '../repositories/recipients-repository';
import { AdministratorsRepository } from '../repositories/administrators-repository';
import { AdministratorDoesNotExistError } from './errors/administrator-does-not-exist-error';
interface GetRecipientUseCaseRequest {
    recipientId: string;
    administratorId: string;
}
type GetRecipientUseCaseResponse = Either<RecipientDoesNotExistError | AdministratorDoesNotExistError, {
    recipient: Recipient;
}>;
export declare class GetRecipientUseCase {
    private readonly recipientsRepository;
    private readonly administratorsRepository;
    constructor(recipientsRepository: RecipientsRepository, administratorsRepository: AdministratorsRepository);
    execute({ recipientId, administratorId, }: GetRecipientUseCaseRequest): Promise<GetRecipientUseCaseResponse>;
}
export {};
