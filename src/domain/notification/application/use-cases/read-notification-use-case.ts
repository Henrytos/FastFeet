import { Either, left, right } from '@/core/either'
import { Notification } from '../../enterprise/entities/notification'
import { NotificationsRepository } from '../repositories/notifications-repository'
import { NotificationDoesNotExistsError } from './errors/notification-does-not-exists-error'
import { WrongCredentialsError } from '@/domain/delivery/application/use-cases/errors/wrong-credentials-error'
import { Injectable } from '@nestjs/common'

export interface ReadNotificationUseCaseRequest {
  notificationId: string
  recipientId: string
}

export type ReadNotificationUseCaseResponse = Either<
  NotificationDoesNotExistsError | WrongCredentialsError,
  {
    notification: Notification
  }
>
@Injectable()
export class ReadNotificationUseCase {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  async execute({
    notificationId,
    recipientId,
  }: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse> {
    const notification =
      await this.notificationsRepository.findById(notificationId)

    if (!notification) {
      return left(new NotificationDoesNotExistsError())
    }

    if (notification.recipientId.toString() !== recipientId) {
      return left(new WrongCredentialsError())
    }

    notification.read()
    await this.notificationsRepository.save(notification)

    return right({ notification })
  }
}
