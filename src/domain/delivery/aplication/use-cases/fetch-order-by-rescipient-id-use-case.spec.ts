import { FetchOrderByRecipientIdUseCase } from "./fetch-order-by-rescipient-id-use-case";
import { InMemoryOrdersRepository } from "@/test/repositories/in-memory-orders-repository";
import { InMemoryRecipientsRepository } from "@/test/repositories/in-memory-recipients-repository";
import { makeRecipient } from "@/test/factories/make-recipient";
import { makeOrder } from "@/test/factories/make-order";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { RecipientDoesNotExistError } from "./errors/recipient-does-not-exist-error";
import { InMemoryDeliveryAddressRepository } from "@/test/repositories/in-memory-delivery-address-repository";

describe("fetch order by recipient id use case", () => {
  let sut: FetchOrderByRecipientIdUseCase;
  let inMemoryOrdersRepository: InMemoryOrdersRepository;
  let inMemoryDeliveryAddressRepository: InMemoryDeliveryAddressRepository;
  let inMemoryRecipientsRepository: InMemoryRecipientsRepository;

  beforeEach(() => {
    inMemoryDeliveryAddressRepository = new InMemoryDeliveryAddressRepository();

    inMemoryOrdersRepository = new InMemoryOrdersRepository(
      inMemoryDeliveryAddressRepository
    );
    inMemoryRecipientsRepository = new InMemoryRecipientsRepository(
      inMemoryOrdersRepository,
      inMemoryDeliveryAddressRepository
    );
    sut = new FetchOrderByRecipientIdUseCase(
      inMemoryRecipientsRepository,
      inMemoryOrdersRepository
    );
  });

  it("It should be possible to seek a request by recipient", async () => {
    const recipient = makeRecipient();
    inMemoryRecipientsRepository.items.push(recipient);
    const order = makeOrder({ recipientId: recipient.id });
    inMemoryOrdersRepository.items.push(order);

    const result = await sut.execute({
      recipientId: recipient.id.toString(),
      page: 1,
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      orders: expect.arrayContaining([order]),
    });
  });
  it("should be possible to seek a request by recipients for two", async () => {
    const recipient = makeRecipient();
    inMemoryRecipientsRepository.items.push(recipient);
    for (let i = 1; i <= 22; i++) {
      const order = makeOrder(
        { recipientId: recipient.id },
        new UniqueEntityID(i.toString())
      );
      inMemoryOrdersRepository.items.push(order);
    }

    const result = await sut.execute({
      recipientId: recipient.id.toString(),
      page: 2,
    });

    expect(result.isRight()).toBe(true);

    expect(result.value).toEqual({
      orders: expect.arrayContaining([
        expect.objectContaining({ _id: new UniqueEntityID("21") }),
        expect.objectContaining({ _id: new UniqueEntityID("22") }),
      ]),
    });
  });

  it("should not be possible to seek a request by recipient if he is existing", async () => {
    const result = await sut.execute({
      recipientId: "invalid-recipient-id",
      page: 2,
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(RecipientDoesNotExistError);
  });
});
