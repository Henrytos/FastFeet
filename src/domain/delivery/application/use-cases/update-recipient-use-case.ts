import { Either, left, right } from '@/core/either'
import { RecipientsRepository } from '../repositories/recipients-repository'
import { AdministratorsRepository } from '../repositories/administrators-repository'
import { AdministratorDoesNotExistError } from './errors/administrator-does-not-exist-error'
import { RecipientDoesNotExistError } from './errors/recipient-does-not-exist-error'

interface UpdateRecipientUseCaseRequest {
  administratorId: string
  recipientId: string
  name: string
  email: string
}

type UpdateRecipientUseCaseResponse = Either<
  AdministratorDoesNotExistError,
  object
>
export class UpdateRecipientUseCase {
  constructor(
    private readonly administratorsRepository: AdministratorsRepository,
    private readonly recipientsRepository: RecipientsRepository,
  ) {}

  async execute({
    administratorId,
    recipientId,
    name,
    email,
  }: UpdateRecipientUseCaseRequest): Promise<UpdateRecipientUseCaseResponse> {
    const administrator =
      await this.administratorsRepository.findById(administratorId)
    if (!administrator) {
      return left(new AdministratorDoesNotExistError())
    }

    const recipient = await this.recipientsRepository.findById(recipientId)
    if (!recipient) {
      return left(new RecipientDoesNotExistError())
    }

    recipient.name = name
    recipient.email = email

    await this.recipientsRepository.save(recipient)

    return right({})
  }
}
