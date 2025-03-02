import { EventHandler } from '@/core/events/event-handler'
import { SendNotificationUseCase } from '../use-cases/send-notification-use-case'
import { DomainEvents } from '@/core/events/domain-events'
import { OrderWithdrawnEvent } from '@/domain/delivery/enterprise/events/order-withdrawn-event'
import { Injectable } from '@nestjs/common'

@Injectable()
export class OnOrderWentOutForDeliveryEventHandler implements EventHandler {
  constructor(
    private readonly sendNotificationUseCase: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNotificationToRecipient.bind(this),
      OrderWithdrawnEvent.name,
    )
  }

  async sendNotificationToRecipient({ order }: OrderWithdrawnEvent) {
    if (order) {
      await this.sendNotificationUseCase.execute({
        recipientId: order.recipientId.toString(),
        title: 'Order went out for delivery',
        content: `Your order with id ${order.id.toString()} went out for delivery`,
      })
    }
  }
}
