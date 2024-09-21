import { DomainEvents } from "@/core/events/domain-events";
import { EventHandler } from "@/core/events/event-handler";
import { OrderMakeDeliveredEvent } from "@/domain/delivery/enterprise/events/order-make-delivered-event";
import { SendNotificationUseCase } from "../use-cases/send-notification-use-case";

export class OnOrderDelivered implements EventHandler {
  constructor(private sendNotification: SendNotificationUseCase) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.handleOrderMakeDelivered.bind(this),
      OrderMakeDeliveredEvent.name
    );
  }

  private async handleOrderMakeDelivered({ order }: OrderMakeDeliveredEvent) {
    if (order) {
      await this.sendNotification.execute({
        recipientId: order.recipientId.toString(),
        title: "order delivered",
        content: "comgratulations your order has been delivered",
      });
    }
  }
}
