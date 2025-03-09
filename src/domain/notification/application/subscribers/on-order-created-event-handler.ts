import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { SendNotificationUseCase } from '../use-cases/send-notification-use-case'
import { OrderCreatedEvent } from '@/domain/delivery/enterprise/events/order-created-event'
import { Injectable } from '@nestjs/common'

@Injectable()
export class OnOrderCreatedEventHandler implements EventHandler {
  constructor(private readonly sendNotification: SendNotificationUseCase) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNotificationToRecipient.bind(this),
      OrderCreatedEvent.name,
    )
  }

  private async sendNotificationToRecipient({ order }: OrderCreatedEvent) {
    if (order) {
      await this.sendNotification.execute({
        recipientId: order.recipientId.toString(),
        title: 'Pedido criado',
        content: `
          Muito obrigado por confiar em nossa empresa.
          Seu pedido: ${order.id} foi criado com sucesso!
          Em breve você receberá mais informações sobre o status do pedido.          
          `,
      })
    }
  }
}
