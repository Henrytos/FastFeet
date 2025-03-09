import { EventHandler } from '@/core/events/event-handler';
import { SendNotificationUseCase } from '../use-cases/send-notification-use-case';
export declare class OnOrderCancellationEventHandler implements EventHandler {
    private readonly sendNotificationUseCase;
    constructor(sendNotificationUseCase: SendNotificationUseCase);
    setupSubscriptions(): void;
    private sendNotificationToRecipient;
}
