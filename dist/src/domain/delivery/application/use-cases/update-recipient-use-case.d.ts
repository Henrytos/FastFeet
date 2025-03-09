import { Either } from '@/core/either';
import { RecipientsRepository } from '../repositories/recipients-repository';
import { AdministratorsRepository } from '../repositories/administrators-repository';
import { AdministratorDoesNotExistError } from './errors/administrator-does-not-exist-error';
import { RecipientDoesNotExistError } from './errors/recipient-does-not-exist-error';
interface UpdateRecipientUseCaseRequest {
    administratorId: string;
    recipientId: string;
    name: string;
    email: string;
}
type UpdateRecipientUseCaseResponse = Either<AdministratorDoesNotExistError | RecipientDoesNotExistError, object>;
export declare class UpdateRecipientUseCase {
    private readonly administratorsRepository;
    private readonly recipientsRepository;
    constructor(administratorsRepository: AdministratorsRepository, recipientsRepository: RecipientsRepository);
    execute({ administratorId, recipientId, name, email, }: UpdateRecipientUseCaseRequest): Promise<UpdateRecipientUseCaseResponse>;
}
export {};
