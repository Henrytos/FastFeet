import { Either } from '@/core/either';
import { Notification } from '../../enterprise/entities/notification';
import { NotificationsRepository } from '../repositories/notifications-repository';
import { SendEmailToUser } from '../email/send-email';
import { RecipientsRepository } from '@/domain/delivery/application/repositories/recipients-repository';
import { RecipientDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/recipient-does-not-exist-error';
export interface SendNotificationUseCaseRequest {
    recipientId: string;
    title: string;
    content: string;
}
export type SendNotificationUseCaseResponse = Either<RecipientDoesNotExistError, {
    notification: Notification;
}>;
export declare class SendNotificationUseCase {
    private readonly notificationsRepository;
    private readonly recipientsRepository;
    private readonly sendEmailToUser;
    constructor(notificationsRepository: NotificationsRepository, recipientsRepository: RecipientsRepository, sendEmailToUser: SendEmailToUser);
    execute({ recipientId, title, content, }: SendNotificationUseCaseRequest): Promise<SendNotificationUseCaseResponse>;
}
