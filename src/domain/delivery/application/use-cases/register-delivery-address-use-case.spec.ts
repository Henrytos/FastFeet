import { makeAdministrator } from "@/test/factories/make-administrator";
import { RegisterDeliveryAddressUseCase } from "./register-delivery-address-use-case";
import { InMemoryAdministratorsRepository } from "@/test/repositories/in-memory-administrators-repository";
import { InMemoryDeliveryAddressRepository } from "@/test/repositories/in-memory-delivery-address-repository";
import { AdministratorDoesNotExistError } from "./errors/administrator-does-not-exist-error";

describe("register delivery address use case", () => {
  let sut: RegisterDeliveryAddressUseCase;
  let inMemoryAdministratorRepository: InMemoryAdministratorsRepository;
  let inMemoryDeliveryAddressRepository: InMemoryDeliveryAddressRepository;

  beforeEach(() => {
    inMemoryAdministratorRepository = new InMemoryAdministratorsRepository();
    inMemoryDeliveryAddressRepository = new InMemoryDeliveryAddressRepository();
    sut = new RegisterDeliveryAddressUseCase(
      inMemoryAdministratorRepository,
      inMemoryDeliveryAddressRepository,
    );
  });

  it("should be possible to register address", async () => {
    const administrator = makeAdministrator();
    inMemoryAdministratorRepository.items.push(administrator);

    const result = await sut.execute({
      administratorId: administrator.id.toString(),
      city: "city",
      latitude: 0,
      longitude: 0,
      neighborhood: "neighborhood",
      number: "number",
      state: "state",
      street: "street",
      zip: "12345678",
    });

    expect(result.isRight()).toEqual(true);
    expect(inMemoryDeliveryAddressRepository.items).toHaveLength(1);
    expect(inMemoryDeliveryAddressRepository.items[0]).toMatchObject({
      props: {
        city: "city",
        latitude: 0,
        longitude: 0,
      },
    });
  });

  it("should not be possible to register address if there is no administrator", async () => {
    const result = await sut.execute({
      administratorId: "invalid-administrator-id",
      city: "city",
      latitude: 0,
      longitude: 0,
      neighborhood: "neighborhood",
      number: "number",
      state: "state",
      street: "street",
      zip: "12345678",
    });

    expect(result.isLeft()).toEqual(true);
    expect(inMemoryDeliveryAddressRepository.items).toHaveLength(0);
    expect(result.value).toBeInstanceOf(AdministratorDoesNotExistError);
  });
});
