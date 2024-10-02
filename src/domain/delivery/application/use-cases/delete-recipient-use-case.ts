import { Either, left, right } from '@/core/either';
import { RecipientDoesNotExistError } from './errors/recipient-does-not-exist-error';
import { AdministratorDoesNotExistError } from './errors/administrator-does-not-exist-error';
import { RecipientsRepository } from '../repositories/recipients-repository';
import { AdministratorsRepository } from '../repositories/administrators-repository';

interface DeleteRecipientUseCaseRequest {
  recipientId: string;
  administratorId: string;
}

type DeleteRecipientUseCaseResponse = Either<
  RecipientDoesNotExistError | AdministratorDoesNotExistError,
  {}
>;

export class DeleteRecipientUseCase {
  constructor(
    private recipientsRepository: RecipientsRepository,
    private administratorsRepository: AdministratorsRepository,
  ) {}

  async execute({
    recipientId,
    administratorId,
  }: DeleteRecipientUseCaseRequest): Promise<DeleteRecipientUseCaseResponse> {
    const recipient = await this.recipientsRepository.findById(recipientId);
    if (!recipient) {
      return left(new RecipientDoesNotExistError());
    }

    const administrator =
      await this.administratorsRepository.findById(administratorId);
    if (!administrator) {
      return left(new AdministratorDoesNotExistError());
    }

    await this.recipientsRepository.delete(recipient);

    return right({});
  }
}