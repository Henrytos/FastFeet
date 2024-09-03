import { makeAdministrator } from "@/test/factories/make-administrator";
import { makeDeliveryMan } from "@/test/factories/make-delivery-man";
import { makeDeliveryAddress } from "@/test/factories/make-delivery-address";
import { makeRecipient } from "@/test/factories/make-recipient";

import { AdministratorDoesNotExistError } from "./errors/administrator-does-not-exist-error";
import { DeliveryManDoesNotExistError } from "./errors/delivery-man-does-not-exist-error";
import { RecipientDoesNotExistError } from "./errors/recipient-does-not-exist-error";
import { DeliveryAddressDoesNotExistError } from "./errors/delivery-address-does-not-exist-error";

import { InMemoryOrdersRepository } from "@/test/repositories/in-memory-orders-repository";
import { RegisterOrderForRecipientUseCase } from "./register-order-for-recipient-use-case";
import { InMemoryDeliveryMansRepository } from "@/test/repositories/in-memory-delivery-mans-repository";
import { InMemoryAdministratorsRepository } from "@/test/repositories/in-memory-administrators-repository";
import { InMemoryDeliveryAddressRepository } from "@/test/repositories/in-memory-delivery-address-repository";
import { InMemoryRecipientsRepository } from "@/test/repositories/in-memory-recipients-repository";

describe("register order for recipient use case", () => {
  let sut: RegisterOrderForRecipientUseCase;
  let inMemoryOrdersRepository: InMemoryOrdersRepository;
  let inMemoryAdministratorsRepository: InMemoryAdministratorsRepository;
  let inMemoryDeliveryMansRepository: InMemoryDeliveryMansRepository;
  let inMemoryDeliveryAddressRepository: InMemoryDeliveryAddressRepository;
  let inMemoryRecipientsRepository: InMemoryRecipientsRepository;

  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository();
    inMemoryAdministratorsRepository = new InMemoryAdministratorsRepository();
    inMemoryDeliveryMansRepository = new InMemoryDeliveryMansRepository();
    inMemoryDeliveryAddressRepository = new InMemoryDeliveryAddressRepository();
    inMemoryRecipientsRepository = new InMemoryRecipientsRepository();
    sut = new RegisterOrderForRecipientUseCase(
      inMemoryOrdersRepository,
      inMemoryAdministratorsRepository,
      inMemoryDeliveryMansRepository,
      inMemoryDeliveryAddressRepository,
      inMemoryRecipientsRepository
    );
  });

  it("should be possible to register order for the destination", async () => {
    const administrator = makeAdministrator();
    inMemoryAdministratorsRepository.items.push(administrator);
    const deliveryMan = makeDeliveryMan({
      administratorId: administrator.id,
    });
    inMemoryDeliveryMansRepository.items.push(deliveryMan);

    const deliveryAddress = makeDeliveryAddress();
    inMemoryDeliveryAddressRepository.items.push(deliveryAddress);

    const recipient = makeRecipient({
      deliveryAddressId: deliveryAddress.id,
    });
    inMemoryRecipientsRepository.items.push(recipient);

    const result = await sut.execute({
      administratorId: administrator.id.toString(),
      deliveryManId: deliveryMan.id.toString(),
      deliveryAddressId: deliveryAddress.id.toString(),
      recipientId: recipient.id.toString(),
    });

    expect(result.isRight()).toEqual(true);
    expect(inMemoryOrdersRepository.items).toHaveLength(1);
  });

  it("should not be possible to create order without administrator", async () => {
    const deliveryMan = makeDeliveryMan();

    const deliveryAddress = makeDeliveryAddress();
    inMemoryDeliveryAddressRepository.items.push(deliveryAddress);
    const recipient = makeRecipient({
      deliveryAddressId: deliveryAddress.id,
    });
    inMemoryRecipientsRepository.items.push(recipient);

    const result = await sut.execute({
      administratorId: "invalide-administrator-id",
      deliveryManId: deliveryMan.id.toString(),
      deliveryAddressId: deliveryAddress.id.toString(),
      recipientId: recipient.id.toString(),
    });

    expect(result.isLeft()).toEqual(true);
    expect(inMemoryOrdersRepository.items).toHaveLength(0);
    expect(result.value).toBeInstanceOf(AdministratorDoesNotExistError);
  });

  it("should not be possible to create order without delivery", async () => {
    const administrator = makeAdministrator();
    inMemoryAdministratorsRepository.items.push(administrator);

    const deliveryAddress = makeDeliveryAddress();
    inMemoryDeliveryAddressRepository.items.push(deliveryAddress);
    const recipient = makeRecipient({
      deliveryAddressId: deliveryAddress.id,
    });
    inMemoryRecipientsRepository.items.push(recipient);

    const result = await sut.execute({
      administratorId: administrator.id.toString(),
      deliveryManId: "invalid-delivery-man-id",
      deliveryAddressId: deliveryAddress.id.toString(),
      recipientId: recipient.id.toString(),
    });

    expect(result.isLeft()).toEqual(true);
    expect(inMemoryOrdersRepository.items).toHaveLength(0);
    expect(result.value).toBeInstanceOf(DeliveryManDoesNotExistError);
  });

  it("should not be possible to create order without destination", async () => {
    const administrator = makeAdministrator();
    inMemoryAdministratorsRepository.items.push(administrator);
    const deliveryMan = makeDeliveryMan({
      administratorId: administrator.id,
    });
    inMemoryDeliveryMansRepository.items.push(deliveryMan);

    const deliveryAddress = makeDeliveryAddress();
    inMemoryDeliveryAddressRepository.items.push(deliveryAddress);

    const result = await sut.execute({
      administratorId: administrator.id.toString(),
      deliveryManId: deliveryMan.id.toString(),
      deliveryAddressId: deliveryAddress.id.toString(),
      recipientId: "invalid-recipient-id",
    });

    expect(result.isLeft()).toEqual(true);
    expect(inMemoryOrdersRepository.items).toHaveLength(0);
    expect(result.value).toBeInstanceOf(RecipientDoesNotExistError);
  });

  it("should not be possible to create order with address of the destination", async () => {
    const administrator = makeAdministrator();
    inMemoryAdministratorsRepository.items.push(administrator);
    const deliveryMan = makeDeliveryMan({
      administratorId: administrator.id,
    });
    inMemoryDeliveryMansRepository.items.push(deliveryMan);

    const deliveryAddress = makeDeliveryAddress();
    inMemoryDeliveryAddressRepository.items.push(deliveryAddress);
    const recipient = makeRecipient({
      deliveryAddressId: deliveryAddress.id,
    });
    inMemoryRecipientsRepository.items.push(recipient);

    const result = await sut.execute({
      administratorId: administrator.id.toString(),
      deliveryManId: deliveryMan.id.toString(),
      deliveryAddressId: "invalid-delivery-address-id",
      recipientId: recipient.id.toString(),
    });

    expect(result.isLeft()).toEqual(true);
    expect(inMemoryOrdersRepository.items).toHaveLength(0);
    expect(result.value).toBeInstanceOf(DeliveryAddressDoesNotExistError);
  });
});
