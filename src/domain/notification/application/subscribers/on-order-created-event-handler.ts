import { DomainEvents } from "@/core/events/domain-events";
import { EventHandler } from "@/core/events/event-handler";
import { SendNotificationUseCase } from "../use-cases/send-notification-use-case";
import { OrderCreatedEvent } from "@/domain/delivery/enterprise/events/order-created-event";

export class OnOrderCreatedEventHandler implements EventHandler {
  constructor(private readonly sendNotification: SendNotificationUseCase) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNotificationToRecipient.bind(this),
      OrderCreatedEvent.name,
    );
  }

  private async sendNotificationToRecipient({ order }: OrderCreatedEvent) {
    if (order) {
      await this.sendNotification.execute({
        recipientId: order.recipientId.toString(),
        title: "Order created",
        content: `Your order with id ${order.id.toString()} has been created`,
      });
    }
  }
}
