import { EventHandler } from "@/core/events/event-handler";
import { SendNotificationUseCase } from "../use-cases/send-notification-use-case";
import { DomainEvents } from "@/core/events/domain-events";
import { OrderWithdrawnEvent } from "@/domain/delivery/enterprise/events/order-withdrawn-event";

export class OnOrderWentOutForDeliveyEventHandler implements EventHandler {
  constructor(private sendNotificationUseCase: SendNotificationUseCase) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNotificatioToRecipient.bind(this),
      OrderWithdrawnEvent.name
    );
  }

  async sendNotificatioToRecipient({ order }: OrderWithdrawnEvent) {
    console.log("OnOrderWentOutForDeliveyEventHandler", order);
    if (order) {
      await this.sendNotificationUseCase.execute({
        recipientId: order.recipientId.toString(),
        title: "Order went out for delivery",
        content: `Your order with id ${order.id.toString()} went out for delivery`,
      });
    }
  }
}
