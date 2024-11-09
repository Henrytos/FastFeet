import { EventHandler } from '@/core/events/event-handler'
import { SendNotificationUseCase } from '../use-cases/send-notification-use-case'
import { DomainEvents } from '@/core/events/domain-events'
import { OrderCanceledEvent } from '@/domain/delivery/enterprise/events/order-canceled-event'

export class OnOrderCancellationEventHandler implements EventHandler {
  constructor(
    private readonly sendNotificationUseCase: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNotificationToRecipient.bind(this),
      OrderCanceledEvent.name,
    )
  }

  private async sendNotificationToRecipient({ order }: OrderCanceledEvent) {
    if (order) {
      await this.sendNotificationUseCase.execute({
        recipientId: order.recipientId.toString(),
        title: 'Order cancelled',
        content: `Your order with id ${order.id.toString()} has been cancelled`,
      })
    }
  }
}
