import { InMemoryAdministratorsRepository } from "@/test/repositories/in-memory-administrators-repository";
import { DeleteRecipientUseCase } from "./delete-recipient-use-case";
import { InMemoryRecipientsRepository } from "@/test/repositories/in-memory-recipients-repository";
import { InMemoryOrdersRepository } from "@/test/repositories/in-memory-orders-repository";
import { InMemoryDeliveryAddressRepository } from "@/test/repositories/in-memory-delivery-address-repository";
import { makeRecipient } from "@/test/factories/make-recipient";
import { makeAdministrator } from "@/test/factories/make-administrator";
import { makeDeliveryAddress } from "@/test/factories/make-delivery-address";
import { makeOrder } from "@/test/factories/make-order";

describe("delete recipient use case", () => {
  let sut: DeleteRecipientUseCase;
  let inMemoryAdministratorsRepository: InMemoryAdministratorsRepository;
  let inMemomoryRecipientsRepository: InMemoryRecipientsRepository;
  let inMemoryOrdersRepository: InMemoryOrdersRepository;
  let inMemoryDeliveryAddressRepository: InMemoryDeliveryAddressRepository;

  beforeEach(() => {
    inMemoryAdministratorsRepository = new InMemoryAdministratorsRepository();
    inMemoryOrdersRepository = new InMemoryOrdersRepository();
    inMemoryDeliveryAddressRepository = new InMemoryDeliveryAddressRepository();

    inMemomoryRecipientsRepository = new InMemoryRecipientsRepository(
      inMemoryOrdersRepository,
      inMemoryDeliveryAddressRepository
    );

    sut = new DeleteRecipientUseCase(
      inMemomoryRecipientsRepository,
      inMemoryAdministratorsRepository
    );
  });

  it("should delete a recipient", async () => {
    const deliveryAddress = makeDeliveryAddress();
    inMemoryDeliveryAddressRepository.items.push(deliveryAddress);

    const recipient = makeRecipient();
    inMemomoryRecipientsRepository.items.push(recipient);

    const administrator = makeAdministrator();
    inMemoryAdministratorsRepository.items.push(administrator);

    const order = makeOrder({
      deliviryAddressId: deliveryAddress.id,
      recipientId: recipient.id,
    });
    inMemoryOrdersRepository.items.push(order);

    const result = await sut.execute({
      administratorId: administrator.id.toString(),
      recipientId: recipient.id.toString(),
    });

    expect(result.isRight()).toEqual(true);
    expect(inMemomoryRecipientsRepository.items).toHaveLength(0);
    expect(inMemoryOrdersRepository.items).toHaveLength(0);
    expect(inMemoryDeliveryAddressRepository.items).toHaveLength(0);
  });

  it("should delete a recipient", async () => {
    const deliveryAddress = makeDeliveryAddress();
    inMemoryDeliveryAddressRepository.items.push(deliveryAddress);

    const recipient = makeRecipient();
    inMemomoryRecipientsRepository.items.push(recipient);

    const administrator = makeAdministrator();
    inMemoryAdministratorsRepository.items.push(administrator);

    const order = makeOrder({
      deliviryAddressId: deliveryAddress.id,
      recipientId: recipient.id,
    });
    inMemoryOrdersRepository.items.push(order);

    const result = await sut.execute({
      administratorId: administrator.id.toString(),
      recipientId: recipient.id.toString(),
    });

    expect(result.isRight()).toEqual(true);
    expect(inMemomoryRecipientsRepository.items).toHaveLength(0);
    expect(inMemoryOrdersRepository.items).toHaveLength(0);
    expect(inMemoryDeliveryAddressRepository.items).toHaveLength(0);
  });
});
