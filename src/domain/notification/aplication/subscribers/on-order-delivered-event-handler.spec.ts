import { InMemoryNotificationsRepository } from "@/test/repositories/in-memory-notifications-repository";
import { SendNotificationUseCase } from "../use-cases/send-notification-use-case";
import { makeOrder } from "@/test/factories/make-order";
import { makeRecipient } from "@/test/factories/make-recipient";
import { InMemoryOrdersRepository } from "@/test/repositories/in-memory-orders-repository";
import { InMemoryRecipientsRepository } from "@/test/repositories/in-memory-recipients-repository";
import { InMemoryDeliveryAddressRepository } from "@/test/repositories/in-memory-delivery-address-repository";
import { waitFor } from "@/test/utils/wait-for";

import { SpyInstance } from "vitest";
import {
  MarkAnOrderAsDeliveredUseCaseRequest,
  MarkAnOrderAsDeliveredUseCaseResponse,
} from "@/domain/delivery/aplication/use-cases/mark-an-order-as-delivered-use-case";
import { OnOrderDeliveredEventHandler } from "./on-order-delivered-event-handler";

let sendNotificationUseCase: SendNotificationUseCase;
let inMemoryNotificationsRepository: InMemoryNotificationsRepository;

let inMemoryRecipientsRepository: InMemoryRecipientsRepository;
let inMemoryOrdersRepository: InMemoryOrdersRepository;
let inMemoryDeliveryAddressRepository: InMemoryDeliveryAddressRepository;

let sendNotificationExecuteSpy: SpyInstance<
  [MarkAnOrderAsDeliveredUseCaseRequest],
  MarkAnOrderAsDeliveredUseCaseResponse
>;

describe("On Answer mark Delivered", () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository(
      inMemoryDeliveryAddressRepository
    );
    inMemoryDeliveryAddressRepository = new InMemoryDeliveryAddressRepository();
    inMemoryRecipientsRepository = new InMemoryRecipientsRepository(
      inMemoryOrdersRepository,
      inMemoryDeliveryAddressRepository
    );

    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationsRepository
    );
    new OnOrderDeliveredEventHandler(sendNotificationUseCase);
    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, "execute");
  });

  it("should order delivered", async () => {
    const recipient = makeRecipient();
    inMemoryRecipientsRepository.create(recipient);
    const order = makeOrder({
      recipientId: recipient.id,
      status: "withdrawn",
    });
    order.status = "delivered";
    await inMemoryOrdersRepository.save(order);

    waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled();
    });
  });
});
