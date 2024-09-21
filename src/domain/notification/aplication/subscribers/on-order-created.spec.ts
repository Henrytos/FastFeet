import { InMemoryNotificationsRepository } from "@/test/repositories/in-memory-notifications-repository";
import {
  SendNotificationUseCase,
  SendNotificationUseCaseRequest,
  SendNotificationUseCaseResponse,
} from "../use-cases/send-notification-use-case";
import { OnOrderCreatedSubscriber } from "./on-order-created";
import { makeOrder } from "@/test/factories/make-order";
import { makeRecipient } from "@/test/factories/make-recipient";
import { InMemoryOrdersRepository } from "@/test/repositories/in-memory-orders-repository";
import { InMemoryRecipientsRepository } from "@/test/repositories/in-memory-recipients-repository";
import { InMemoryDeliveryAddressRepository } from "@/test/repositories/in-memory-delivery-address-repository";
import { waitFor } from "@/test/utils/wait-for";

import { SpyInstance } from "vitest";

let sendNotificationUseCase: SendNotificationUseCase;
let inMemoryNotificationsRepository: InMemoryNotificationsRepository;

let inMemoryRecipientsRepository: InMemoryRecipientsRepository;
let inMemoryOrdersRepository: InMemoryOrdersRepository;
let inMemoryDeliveryAddressRepository: InMemoryDeliveryAddressRepository;

let sendNotificationExecuteSpy: SpyInstance<
  [SendNotificationUseCaseRequest],
  SendNotificationUseCaseResponse
>;

describe("On Answer Created", () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository();
    inMemoryDeliveryAddressRepository = new InMemoryDeliveryAddressRepository();
    inMemoryRecipientsRepository = new InMemoryRecipientsRepository(
      inMemoryOrdersRepository,
      inMemoryDeliveryAddressRepository
    );

    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationsRepository
    );
    new OnOrderCreatedSubscriber(sendNotificationUseCase);
    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, "execute");
  });

  it("should  send a notification when an order is created", async () => {
    const recipient = makeRecipient();
    inMemoryRecipientsRepository.create(recipient);
    const order = makeOrder({
      recipientId: recipient.id,
    });
    inMemoryOrdersRepository.create(order);

    waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled();
    });
  });
});