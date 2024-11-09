import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { OrderMakeDeliveredEvent } from '@/domain/delivery/enterprise/events/order-make-delivered-event'
import { SendNotificationUseCase } from '../use-cases/send-notification-use-case'

export class OnOrderDeliveredEventHandler implements EventHandler {
  constructor(private readonly sendNotification: SendNotificationUseCase) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNotificationToRecipient.bind(this),
      OrderMakeDeliveredEvent.name,
    )
  }

  private async sendNotificationToRecipient({
    order,
  }: OrderMakeDeliveredEvent) {
    if (order) {
      await this.sendNotification.execute({
        recipientId: order.recipientId.toString(),
        title: 'order delivered',
        content: 'your order has been delivered',
      })
    }
  }
}
