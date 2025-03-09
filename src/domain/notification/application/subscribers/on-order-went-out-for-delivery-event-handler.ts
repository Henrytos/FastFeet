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
    await this.sendNotificationUseCase.execute({
      recipientId: order.recipientId.toString(),
      title: 'Pedido saiu para entrega',
      content: `
        Seu pedido: ${order.id} saiu para entrega!
        Nosso entregador está a caminho.
        Em breve você receberá mais informações sobre o status do pedido.
      `,
    })
  }
}
