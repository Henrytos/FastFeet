import { Either, left, right } from '@/core/either'
import { Notification } from '../../enterprise/entities/notification'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotificationsRepository } from '../repositories/notifications-repository'
import { Injectable } from '@nestjs/common'
import { SendEmailToUser } from '../email/send-email'
import { RecipientsRepository } from '@/domain/delivery/application/repositories/recipients-repository'
import { RecipientDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/recipient-does-not-exist-error'

export interface SendNotificationUseCaseRequest {
  recipientId: string
  title: string
  content: string
}

export type SendNotificationUseCaseResponse = Either<
  RecipientDoesNotExistError,
  {
    notification: Notification
  }
>
@Injectable()
export class SendNotificationUseCase {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
    private readonly recipientsRepository: RecipientsRepository,
    private readonly sendEmailToUser: SendEmailToUser,
  ) {}

  async execute({
    recipientId,
    title,
    content,
  }: SendNotificationUseCaseRequest): Promise<SendNotificationUseCaseResponse> {
    const notification = Notification.create({
      recipientId: new UniqueEntityID(recipientId),
      title,
      content,
    })

    await this.notificationsRepository.create(notification)

    const recipient = await this.recipientsRepository.findById(recipientId)

    if (!recipient) {
      return left(new RecipientDoesNotExistError())
    }

    await this.sendEmailToUser.send({
      to: {
        email: recipient.email,
        subject: notification.title,
        body: notification.content,
      },
    })

    return right({ notification })
  }
}
