import { Either } from '@/core/either';
import { Notification } from '../../enterprise/entities/notification';
import { NotificationsRepository } from '../repositories/notifications-repository';
import { NotificationDoesNotExistsError } from './errors/notification-does-not-exists-error';
import { WrongCredentialsError } from '@/domain/delivery/application/use-cases/errors/wrong-credentials-error';
export interface ReadNotificationUseCaseRequest {
    notificationId: string;
    recipientId: string;
}
export type ReadNotificationUseCaseResponse = Either<NotificationDoesNotExistsError | WrongCredentialsError, {
    notification: Notification;
}>;
export declare class ReadNotificationUseCase {
    private readonly notificationsRepository;
    constructor(notificationsRepository: NotificationsRepository);
    execute({ notificationId, recipientId, }: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse>;
}
