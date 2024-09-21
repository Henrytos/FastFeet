import { DomainEvents } from "@/core/events/domain-events";
import { EventHandler } from "@/core/events/event-handler";
import { OrderMakeDeliveredEvent } from "@/domain/delivery/enterprise/events/order-make-delivered-event";
import { SendNotificationUseCase } from "../use-cases/send-notification-use-case";

export class OnOrderDeliveredEventHandler implements EventHandler {
  constructor(private sendNotification: SendNotificationUseCase) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNotificatioToRecipient.bind(this),
      OrderMakeDeliveredEvent.name
    );
  }

  private async sendNotificatioToRecipient({ order }: OrderMakeDeliveredEvent) {
    console.log("OnOrderDeliveredEventHandler", order);
    if (order) {
      await this.sendNotification.execute({
        recipientId: order.recipientId.toString(),
        title: "order delivered",
        content: "comgratulations your order has been delivered",
      });
    }
  }
}
