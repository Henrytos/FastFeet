import { Either } from '@/core/either';
import { DeliveryAddressDoesNotExistError } from './errors/delivery-address-does-not-exist-error';
import { RecipientDoesNotExistError } from './errors/recipient-does-not-exist-error';
import { RecipientsRepository } from '../repositories/recipients-repository';
import { AdministratorsRepository } from '../repositories/administrators-repository';
import { AdministratorDoesNotExistError } from './errors/administrator-does-not-exist-error';
interface RegisterRecipientUseCaseRequest {
    name: string;
    email: string;
    administratorId: string;
}
type RegisterRecipientUseCaseResponse = Either<AdministratorDoesNotExistError | DeliveryAddressDoesNotExistError | RecipientDoesNotExistError, object>;
export declare class RegisterRecipientUseCase {
    private readonly recipientsRepository;
    private readonly administratorsRepository;
    constructor(recipientsRepository: RecipientsRepository, administratorsRepository: AdministratorsRepository);
    execute({ name, email, administratorId, }: RegisterRecipientUseCaseRequest): Promise<RegisterRecipientUseCaseResponse>;
}
export {};
