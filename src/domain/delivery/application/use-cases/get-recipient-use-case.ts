import { Either, left, right } from '@/core/either'
import { RecipientDoesNotExistError } from './errors/recipient-does-not-exist-error'
import { Recipient } from '../../enterprise/entities/recipient'
import { RecipientsRepository } from '../repositories/recipients-repository'
import { AdministratorsRepository } from '../repositories/administrators-repository'
import { AdministratorDoesNotExistError } from './errors/administrator-does-not-exist-error'
import { Injectable } from '@nestjs/common'

interface GetRecipientUseCaseRequest {
  recipientId: string
  administratorId: string
}

type GetRecipientUseCaseResponse = Either<
  RecipientDoesNotExistError | AdministratorDoesNotExistError,
  {
    recipient: Recipient
  }
>

@Injectable()
export class GetRecipientUseCase {
  constructor(
    private readonly recipientsRepository: RecipientsRepository,
    private readonly administratorsRepository: AdministratorsRepository,
  ) {}

  async execute({
    recipientId,
    administratorId,
  }: GetRecipientUseCaseRequest): Promise<GetRecipientUseCaseResponse> {
    const administrator =
      await this.administratorsRepository.findById(administratorId)
    if (!administrator) {
      return left(new AdministratorDoesNotExistError())
    }

    const recipient = await this.recipientsRepository.findById(recipientId)
    if (!recipient) {
      return left(new RecipientDoesNotExistError())
    }

    return right({
      recipient,
    })
  }
}
