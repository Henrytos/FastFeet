import { InMemoryAdministratorsRepository } from "@/test/repositories/in-memory-administrators-repository";
import { makeDeliveryAddress } from "@/test/factories/make-delivery-address";
import { makeAdministrator } from "@/test/factories/make-administrator";
import { InMemoryRecipientsRepository } from "@/test/repositories/in-memory-recipients-repository";
import { UpdateRecipientUseCase } from "./update-recipient-use-case";
import { InMemoryOrdersRepository } from "@/test/repositories/in-memory-orders-repository";
import { InMemoryDeliveryAddressRepository } from "@/test/repositories/in-memory-delivery-address-repository";
import { makeRecipient } from "@/test/factories/make-recipient";
import { AdministratorDoesNotExistError } from "./errors/administrator-does-not-exist-error";
import { RecipientDoesNotExistError } from "./errors/recipient-does-not-exist-error";

describe("update recipient use case", () => {
  let sut: UpdateRecipientUseCase;

  let inMemoryAdministratorsRepository: InMemoryAdministratorsRepository;
  let inMemoryRecipientsRepository: InMemoryRecipientsRepository;
  let inMemoryOrdersRepository: InMemoryOrdersRepository;
  let inMemoryDeliveryAddressRepository: InMemoryDeliveryAddressRepository;
  beforeEach(() => {
    inMemoryAdministratorsRepository = new InMemoryAdministratorsRepository();
    inMemoryDeliveryAddressRepository = new InMemoryDeliveryAddressRepository();
    inMemoryOrdersRepository = new InMemoryOrdersRepository(
      inMemoryDeliveryAddressRepository,
    );
    inMemoryRecipientsRepository = new InMemoryRecipientsRepository(
      inMemoryOrdersRepository,
      inMemoryDeliveryAddressRepository,
    );
    sut = new UpdateRecipientUseCase(
      inMemoryAdministratorsRepository,
      inMemoryRecipientsRepository,
    );
  });

  it("should be possible to update recipient", async () => {
    const recipient = makeRecipient({
      email: "notjohn@example.com",
      name: "not John Doe",
    });
    inMemoryRecipientsRepository.items.push(recipient);

    expect(inMemoryRecipientsRepository.items[0]).toMatchObject({
      props: {
        email: "notjohn@example.com",
        name: "not John Doe",
      },
    });

    const administrator = makeAdministrator();
    inMemoryAdministratorsRepository.items.push(administrator);

    const result = await sut.execute({
      administratorId: administrator.id.toString(),
      email: "john@example.com",
      name: "John Doe",
      recipientId: recipient.id.toString(),
    });

    expect(result.isRight()).toEqual(true);
    expect(inMemoryRecipientsRepository.items[0]).toMatchObject({
      props: {
        email: "john@example.com",
        name: "John Doe",
      },
    });
  });

  it("should not be possible to update recipient with invalid administrator", async () => {
    const recipient = makeRecipient();
    inMemoryRecipientsRepository.items.push(recipient);

    const result = await sut.execute({
      administratorId: "invalid-administrator-id",
      email: "john@example.com",
      name: "John Doe",
      recipientId: recipient.id.toString(),
    });

    expect(result.isLeft()).toEqual(true);
    expect(inMemoryRecipientsRepository.items[0]).toMatchObject({
      props: {
        email: recipient.email,
        name: recipient.name,
      },
    });
    expect(result.value).toBeInstanceOf(AdministratorDoesNotExistError);
  });

  it("should not be possible to update recipient with invalid recipient", async () => {
    const recipient = makeRecipient();
    inMemoryRecipientsRepository.items.push(recipient);
    const administrator = makeAdministrator();
    inMemoryAdministratorsRepository.items.push(administrator);

    const result = await sut.execute({
      administratorId: administrator.id.toString(),
      email: "john@example.com",
      name: "John Doe",
      recipientId: "invalid-recipient-id",
    });

    expect(result.isLeft()).toEqual(true);
    expect(inMemoryRecipientsRepository.items[0]).toMatchObject({
      props: {
        email: recipient.email,
        name: recipient.name,
      },
    });
    expect(result.value).toBeInstanceOf(RecipientDoesNotExistError);
  });
});
