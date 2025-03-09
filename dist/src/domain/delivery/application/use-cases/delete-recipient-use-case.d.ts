import { Either } from '@/core/either';
import { RecipientDoesNotExistError } from './errors/recipient-does-not-exist-error';
import { AdministratorDoesNotExistError } from './errors/administrator-does-not-exist-error';
import { RecipientsRepository } from '../repositories/recipients-repository';
import { AdministratorsRepository } from '../repositories/administrators-repository';
interface DeleteRecipientUseCaseRequest {
    recipientId: string;
    administratorId: string;
}
type DeleteRecipientUseCaseResponse = Either<RecipientDoesNotExistError | AdministratorDoesNotExistError, object>;
export declare class DeleteRecipientUseCase {
    private readonly recipientsRepository;
    private readonly administratorsRepository;
    constructor(recipientsRepository: RecipientsRepository, administratorsRepository: AdministratorsRepository);
    execute({ recipientId, administratorId, }: DeleteRecipientUseCaseRequest): Promise<DeleteRecipientUseCaseResponse>;
}
export {};
