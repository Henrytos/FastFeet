import { InMemoryAdministratorsRepository } from "@/test/repositories/in-memory-administrators-repository";
import { CreateDeliveryManByAdministratorUseCase } from "./create-delivery-man-by-administrator-use-case";
import { FakeHashGenerator } from "@/test/cryptography/fake-hash-generator";
import { HashGenerator } from "../cryptography/hash-generator";
import { InMemoryDeliveryMansRepository } from "@/test/repositories/in-memory-delivery-mans-repository";
import { makeAdministrator } from "@/test/factories/make-administrator";
import { AdministratorDoesNotExistError } from "./errors/administrator-does-not-exist-error";

describe("create deleviry man  use case", () => {
  let sut: CreateDeliveryManByAdministratorUseCase;
  let inMemoryAdministratorsRepository: InMemoryAdministratorsRepository;
  let inMemoryDeliveryMansRepository: InMemoryDeliveryMansRepository;
  let fakeHashGenerator: HashGenerator;

  beforeEach(() => {
    inMemoryAdministratorsRepository = new InMemoryAdministratorsRepository();
    inMemoryDeliveryMansRepository = new InMemoryDeliveryMansRepository();
    fakeHashGenerator = new FakeHashGenerator();

    sut = new CreateDeliveryManByAdministratorUseCase(
      inMemoryAdministratorsRepository,
      inMemoryDeliveryMansRepository,
      fakeHashGenerator
    );
  });

  it("should be possible to create a delivery", async () => {
    const administrator = makeAdministrator();
    inMemoryAdministratorsRepository.items.push(administrator);

    const result = await sut.execute({
      administratorId: administrator.id.toString(),
      cpf: "123456789000",
      name: "john doe",
      password: "123456",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryDeliveryMansRepository.items).toHaveLength(1);
    expect(inMemoryDeliveryMansRepository.items[0]).toMatchObject({
      administratorId: administrator.id,
    });
  });

  it("should not be possible to create without being administrator", async () => {
    const result = await sut.execute({
      administratorId: "invalid-administrator-id",
      cpf: "123456789000",
      name: "john doe",
      password: "123456",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(AdministratorDoesNotExistError);
  });
});
