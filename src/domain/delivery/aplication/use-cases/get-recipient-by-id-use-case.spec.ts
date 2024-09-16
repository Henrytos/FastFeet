import { InMemoryRecipientsRepository } from "@/test/repositories/in-memory-recipients-repository";
import { GetRecipientByIdUseCase } from "./get-recipient-by-id-use-case";
import { makeRecipient } from "@/test/factories/make-recipient";
import { RecipientDoesNotExistError } from "./errors/recipient-does-not-exist-error";
import { InMemoryOrdersRepository } from "@/test/repositories/in-memory-orders-repository";
import { InMemoryDeliveryAddressRepository } from "@/test/repositories/in-memory-delivery-address-repository";

describe("get recipient by id use case", () => {
  let sut: GetRecipientByIdUseCase;
  let inMemoryRecipientsRepository: InMemoryRecipientsRepository;
  let inMemoryOrdersRepository: InMemoryOrdersRepository;
  let inMemoryDeliveryAddressRepository: InMemoryDeliveryAddressRepository;

  beforeEach(() => {
    inMemoryRecipientsRepository = new InMemoryRecipientsRepository(
      inMemoryOrdersRepository,
      inMemoryDeliveryAddressRepository
    );
    sut = new GetRecipientByIdUseCase(inMemoryRecipientsRepository);
  });

  it("should return an recipient by the id", async () => {
    const recipient = makeRecipient();
    inMemoryRecipientsRepository.items.push(recipient);

    const result = await sut.execute({
      recipientId: recipient.id.toString(),
    });

    expect(result.isRight()).toEqual(true);
    expect(result.value).toMatchObject({ recipient });
  });

  it("should not return an envomenda if it does not exist", async () => {
    const result = await sut.execute({
      recipientId: "invalid-recipient-id",
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(RecipientDoesNotExistError);
  });
});
