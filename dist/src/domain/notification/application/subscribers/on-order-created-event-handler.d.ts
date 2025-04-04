import { EventHandler } from '@/core/events/event-handler';
import { SendNotificationUseCase } from '../use-cases/send-notification-use-case';
export declare class OnOrderCreatedEventHandler implements EventHandler {
    private readonly sendNotification;
    constructor(sendNotification: SendNotificationUseCase);
    setupSubscriptions(): void;
    private sendNotificationToRecipient;
}
