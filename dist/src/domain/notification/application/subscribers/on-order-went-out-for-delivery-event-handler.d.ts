import { EventHandler } from '@/core/events/event-handler';
import { SendNotificationUseCase } from '../use-cases/send-notification-use-case';
import { OrderWithdrawnEvent } from '@/domain/delivery/enterprise/events/order-withdrawn-event';
export declare class OnOrderWentOutForDeliveryEventHandler implements EventHandler {
    private readonly sendNotificationUseCase;
    constructor(sendNotificationUseCase: SendNotificationUseCase);
    setupSubscriptions(): void;
    sendNotificationToRecipient({ order }: OrderWithdrawnEvent): Promise<void>;
}
