import { makeAdministrator } from "@/test/factories/make-administrator";
import { makeDeliveryAddress } from "@/test/factories/make-delivery-address";
import { makeRecipient } from "@/test/factories/make-recipient";

import { AdministratorDoesNotExistError } from "./errors/administrator-does-not-exist-error";
import { RecipientDoesNotExistError } from "./errors/recipient-does-not-exist-error";
import { DeliveryAddressDoesNotExistError } from "./errors/delivery-address-does-not-exist-error";

import { InMemoryOrdersRepository } from "@/test/repositories/in-memory-orders-repository";
import { RegisterOrderForRecipientUseCase } from "./register-order-for-recipient-use-case";
import { InMemoryAdministratorsRepository } from "@/test/repositories/in-memory-administrators-repository";
import { InMemoryDeliveryAddressRepository } from "@/test/repositories/in-memory-delivery-address-repository";
import { InMemoryRecipientsRepository } from "@/test/repositories/in-memory-recipients-repository";

describe("register order for recipient use case", () => {
  let sut: RegisterOrderForRecipientUseCase;
  let inMemoryOrdersRepository: InMemoryOrdersRepository;
  let inMemoryAdministratorsRepository: InMemoryAdministratorsRepository;
  let inMemoryDeliveryAddressRepository: InMemoryDeliveryAddressRepository;
  let inMemoryRecipientsRepository: InMemoryRecipientsRepository;

  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository();
    inMemoryAdministratorsRepository = new InMemoryAdministratorsRepository();
    inMemoryDeliveryAddressRepository = new InMemoryDeliveryAddressRepository();
    inMemoryRecipientsRepository = new InMemoryRecipientsRepository(
      inMemoryOrdersRepository,
      inMemoryDeliveryAddressRepository
    );
    sut = new RegisterOrderForRecipientUseCase(
      inMemoryOrdersRepository,
      inMemoryAdministratorsRepository,
      inMemoryDeliveryAddressRepository,
      inMemoryRecipientsRepository
    );
  });

  it("should be possible to register order for the destination", async () => {
    const administrator = makeAdministrator();
    inMemoryAdministratorsRepository.items.push(administrator);

    const deliveryAddress = makeDeliveryAddress();
    inMemoryDeliveryAddressRepository.items.push(deliveryAddress);

    const recipient = makeRecipient();
    inMemoryRecipientsRepository.items.push(recipient);

    const result = await sut.execute({
      administratorId: administrator.id.toString(),
      recipientId: recipient.id.toString(),
      deliveryAddressId: deliveryAddress.id.toString(),
    });

    expect(result.isRight()).toEqual(true);
    expect(inMemoryOrdersRepository.items).toHaveLength(1);
  });

  it("should not be possible to create order without administrator", async () => {
    const deliveryAddress = makeDeliveryAddress();
    inMemoryDeliveryAddressRepository.items.push(deliveryAddress);
    const recipient = makeRecipient({});
    inMemoryRecipientsRepository.items.push(recipient);

    const result = await sut.execute({
      administratorId: "invalide-administrator-id",
      recipientId: recipient.id.toString(),
      deliveryAddressId: deliveryAddress.id.toString(),
    });

    expect(result.isLeft()).toEqual(true);
    expect(inMemoryOrdersRepository.items).toHaveLength(0);
    expect(result.value).toBeInstanceOf(AdministratorDoesNotExistError);
  });

  it("should not be possible to create order without destination", async () => {
    const administrator = makeAdministrator();
    inMemoryAdministratorsRepository.items.push(administrator);

    const deliveryAddress = makeDeliveryAddress();
    inMemoryDeliveryAddressRepository.items.push(deliveryAddress);

    const result = await sut.execute({
      administratorId: administrator.id.toString(),
      recipientId: "invalid-recipient-id",
      deliveryAddressId: deliveryAddress.id.toString(),
    });

    expect(result.isLeft()).toEqual(true);
    expect(inMemoryOrdersRepository.items).toHaveLength(0);
    expect(result.value).toBeInstanceOf(RecipientDoesNotExistError);
  });

  it("should not be possible to create order with address of the destination", async () => {
    const administrator = makeAdministrator();
    inMemoryAdministratorsRepository.items.push(administrator);

    const recipient = makeRecipient();
    inMemoryRecipientsRepository.items.push(recipient);

    const result = await sut.execute({
      administratorId: administrator.id.toString(),
      recipientId: recipient.id.toString(),
      deliveryAddressId: "invalid-delivery-address-id",
    });

    expect(result.isLeft()).toEqual(true);
    expect(inMemoryOrdersRepository.items).toHaveLength(0);
    expect(result.value).toBeInstanceOf(DeliveryAddressDoesNotExistError);
  });
});
