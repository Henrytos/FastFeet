import { Either, left, right } from '@/core/either'
import { RecipientsRepository } from '../repositories/recipients-repository'
import { Recipient } from '../../enterprise/entities/recipient'
import { AdministratorDoesNotExistError } from './errors/administrator-does-not-exist-error'
import { AdministratorsRepository } from '../repositories/administrators-repository'
import { Injectable } from '@nestjs/common'

interface FetchRecipientUseCaseRequest {
  administratorId: string
  page: number
  perPage: number
}

type FetchRecipientUseCaseResponse = Either<
  AdministratorDoesNotExistError,
  { recipients: Recipient[] }
>

@Injectable()
export class FetchRecipientUseCase {
  constructor(
    private readonly recipientsRepository: RecipientsRepository,
    private readonly administratorsRepository: AdministratorsRepository,
  ) {}

  async execute({
    administratorId,
    page,
    perPage,
  }: FetchRecipientUseCaseRequest): Promise<FetchRecipientUseCaseResponse> {
    const administrator =
      await this.administratorsRepository.findById(administratorId)

    if (!administrator) {
      return left(new AdministratorDoesNotExistError())
    }

    const recipients = await this.recipientsRepository.fetchRecipients(
      page,
      perPage,
    )

    return right({ recipients })
  }
}
