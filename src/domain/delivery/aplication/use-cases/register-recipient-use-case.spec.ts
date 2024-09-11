import { InMemoryAdministratorsRepository } from "@/test/repositories/in-memory-administrators-repository";
import { RegisterRecipientUseCase } from "./register-recipient-use-case";
import { InMemoryRecipientsRepository } from "@/test/repositories/in-memory-recipients-repository";
import { InMemoryDeliveryAddressRepository } from "@/test/repositories/in-memory-delivery-address-repository";
import { makeAdministrator } from "@/test/factories/make-administrator";
import { makeDeliveryAddress } from "@/test/factories/make-delivery-address";
import { AdministratorDoesNotExistError } from "./errors/administrator-does-not-exist-error";
import { DeliveryAddressDoesNotExistError } from "./errors/delivery-address-does-not-exist-error";
import { makeRecipient } from "@/test/factories/make-recipient";
import { WrongCredentialsError } from "./errors/wrong-credentials-error";

describe("register recipient use case", () => {
  let sut: RegisterRecipientUseCase;
  let inMemoryRecipientsRepository: InMemoryRecipientsRepository;
  let inMemoryDeliveryAddressRepository: InMemoryDeliveryAddressRepository;
  let inMemoryAdministratorsRepository: InMemoryAdministratorsRepository;

  beforeEach(() => {
    inMemoryRecipientsRepository = new InMemoryRecipientsRepository();
    inMemoryDeliveryAddressRepository = new InMemoryDeliveryAddressRepository();
    inMemoryAdministratorsRepository = new InMemoryAdministratorsRepository();

    sut = new RegisterRecipientUseCase(
      inMemoryRecipientsRepository,
      inMemoryDeliveryAddressRepository,
      inMemoryAdministratorsRepository
    );
  });

  it("should be possible to register a destination by the administrator", async () => {
    const administrator = makeAdministrator();
    inMemoryAdministratorsRepository.items.push(administrator);
    const deliveryAddress = makeDeliveryAddress();
    inMemoryDeliveryAddressRepository.items.push(deliveryAddress);

    const result = await sut.execute({
      addressId: deliveryAddress.id.toString(),
      aministratorId: administrator.id.toString(),
      email: "jonhdoes@gmail.com",
      name: "jonh doe",
    });

    expect(result.isRight()).toEqual(true);
    expect(inMemoryRecipientsRepository.items.length).toEqual(1);
    expect(inMemoryRecipientsRepository.items[0]).toMatchObject({
      props: {
        email: "jonhdoes@gmail.com",
        name: "jonh doe",
      },
    });
  });

  it("should not be possible to register a destination without administrator", async () => {
    const deliveryAddress = makeDeliveryAddress();
    inMemoryDeliveryAddressRepository.items.push(deliveryAddress);

    const result = await sut.execute({
      addressId: deliveryAddress.id.toString(),
      aministratorId: "invalid-administrator-id",
      email: "jonhdoes@gmail.com",
      name: "jonh doe",
    });

    expect(result.isLeft()).toEqual(true);
    expect(inMemoryRecipientsRepository.items.length).toEqual(0);
    expect(result.value).toBeInstanceOf(AdministratorDoesNotExistError);
  });

  it("should not be possible to register a destination without address", async () => {
    const administrator = makeAdministrator();
    inMemoryAdministratorsRepository.items.push(administrator);

    const result = await sut.execute({
      addressId: "invalid-address-id",
      aministratorId: administrator.id.toString(),
      email: "jonhdoes@gmail.com",
      name: "jonh doe",
    });

    expect(result.isLeft()).toEqual(true);
    expect(inMemoryRecipientsRepository.items.length).toEqual(0);
    expect(result.value).toBeInstanceOf(DeliveryAddressDoesNotExistError);
  });

  it("should not be possible to register a destination with same email", async () => {
    const recipient = makeRecipient({
      email: "jonhdoes@gmail.com",
      name: "doe jhon",
    });
    inMemoryRecipientsRepository.items.push(recipient);

    const deliveryAddress = makeDeliveryAddress();
    inMemoryDeliveryAddressRepository.items.push(deliveryAddress);
    const administrator = makeAdministrator();
    inMemoryAdministratorsRepository.items.push(administrator);

    const result = await sut.execute({
      addressId: deliveryAddress.id.toString(),
      aministratorId: administrator.id.toString(),
      email: "jonhdoes@gmail.com",
      name: "jonh doe",
    });

    expect(result.isLeft()).toEqual(true);
    expect(inMemoryRecipientsRepository.items.length).toEqual(1);
    expect(result.value).toBeInstanceOf(WrongCredentialsError);
    expect(inMemoryRecipientsRepository.items[0]).toMatchObject({
      props: {
        email: "jonhdoes@gmail.com",
        name: "doe jhon",
      },
    });
  });
});