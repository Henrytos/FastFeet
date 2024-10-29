import { InMemoryAdministratorsRepository } from "@/test/repositories/in-memory-administrators-repository";
import { DeleteRecipientUseCase } from "./delete-recipient-use-case";
import { InMemoryRecipientsRepository } from "@/test/repositories/in-memory-recipients-repository";
import { InMemoryOrdersRepository } from "@/test/repositories/in-memory-orders-repository";
import { InMemoryDeliveryAddressRepository } from "@/test/repositories/in-memory-delivery-address-repository";
import { makeRecipient } from "@/test/factories/make-recipient";
import { makeAdministrator } from "@/test/factories/make-administrator";
import { makeDeliveryAddress } from "@/test/factories/make-delivery-address";
import { makeOrder } from "@/test/factories/make-order";
import { RecipientDoesNotExistError } from "./errors/recipient-does-not-exist-error";
import { AdministratorDoesNotExistError } from "./errors/administrator-does-not-exist-error";

describe("delete recipient use case", () => {
  let sut: DeleteRecipientUseCase;
  let inMemoryAdministratorsRepository: InMemoryAdministratorsRepository;
  let inMemoryRecipientsRepository: InMemoryRecipientsRepository;
  let inMemoryOrdersRepository: InMemoryOrdersRepository;
  let inMemoryDeliveryAddressRepository: InMemoryDeliveryAddressRepository;

  beforeEach(() => {
    inMemoryAdministratorsRepository = new InMemoryAdministratorsRepository();
    inMemoryOrdersRepository = new InMemoryOrdersRepository(
      inMemoryDeliveryAddressRepository,
    );
    inMemoryDeliveryAddressRepository = new InMemoryDeliveryAddressRepository();

    inMemoryRecipientsRepository = new InMemoryRecipientsRepository(
      inMemoryOrdersRepository,
      inMemoryDeliveryAddressRepository,
    );

    sut = new DeleteRecipientUseCase(
      inMemoryRecipientsRepository,
      inMemoryAdministratorsRepository,
    );
  });

  it("should delete a recipient", async () => {
    const deliveryAddress = makeDeliveryAddress();
    inMemoryDeliveryAddressRepository.items.push(deliveryAddress);

    const recipient = makeRecipient();
    inMemoryRecipientsRepository.items.push(recipient);

    const administrator = makeAdministrator();
    inMemoryAdministratorsRepository.items.push(administrator);

    const order = makeOrder({
      deliveryAddressId: deliveryAddress.id,
      recipientId: recipient.id,
    });
    inMemoryOrdersRepository.items.push(order);

    const result = await sut.execute({
      administratorId: administrator.id.toString(),
      recipientId: recipient.id.toString(),
    });

    expect(result.isRight()).toEqual(true);
    expect(inMemoryRecipientsRepository.items).toHaveLength(0);
    expect(inMemoryOrdersRepository.items).toHaveLength(0);
    expect(inMemoryDeliveryAddressRepository.items).toHaveLength(0);
  });

  it("should not be possible to delete intersect if administrator does not exist", async () => {
    const deliveryAddress = makeDeliveryAddress();
    inMemoryDeliveryAddressRepository.items.push(deliveryAddress);

    const recipient = makeRecipient();
    inMemoryRecipientsRepository.items.push(recipient);

    const administrator = makeAdministrator();
    inMemoryAdministratorsRepository.items.push(administrator);

    const order = makeOrder({
      deliveryAddressId: deliveryAddress.id,
      recipientId: recipient.id,
    });
    inMemoryOrdersRepository.items.push(order);

    const result = await sut.execute({
      administratorId: "invalid-administrator-id",
      recipientId: recipient.id.toString(),
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(AdministratorDoesNotExistError);
    expect(inMemoryRecipientsRepository.items).toHaveLength(1);
    expect(inMemoryOrdersRepository.items).toHaveLength(1);
    expect(inMemoryDeliveryAddressRepository.items).toHaveLength(1);
  });

  it("should not be possible to delete intersect if it does not exist", async () => {
    const deliveryAddress = makeDeliveryAddress();
    inMemoryDeliveryAddressRepository.items.push(deliveryAddress);

    const recipient = makeRecipient();
    inMemoryRecipientsRepository.items.push(recipient);

    const administrator = makeAdministrator();
    inMemoryAdministratorsRepository.items.push(administrator);

    const order = makeOrder({
      deliveryAddressId: deliveryAddress.id,
      recipientId: recipient.id,
    });
    inMemoryOrdersRepository.items.push(order);

    const result = await sut.execute({
      administratorId: administrator.id.toString(),
      recipientId: "invalid-recipient-id",
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(RecipientDoesNotExistError);
    expect(inMemoryRecipientsRepository.items).toHaveLength(1);
    expect(inMemoryOrdersRepository.items).toHaveLength(1);
    expect(inMemoryDeliveryAddressRepository.items).toHaveLength(1);
  });
});
