import { FakeEncrypter } from "@/test/cryptography/fake-encrypter";
import { FakeHashComparer } from "@/test/cryptography/fake-hash-comparer";
import { Encrypter } from "../cryptography/encrypter";
import { HashComparer } from "../cryptography/hash-comparer";
import { WrongCredentialsError } from "./errors/wrong-credentials-error";
import { Cpf } from "../../enterprise/entities/value-object/cpf";
import { InMemoryDeliveryMansRepository } from "@/test/repositories/in-memory-delivery-mans-repository";
import { makeDeliveryMan } from "@/test/factories/make-delivery-man";
import { DeliveryManDoesNotExistError } from "./errors/delivery-man-does-not-exist-error";
import { AuthenticateDeliveryManUseCase } from "./authenticate-delivery-man-use-case";

describe("authenticate administrator use case", () => {
  let sut: AuthenticateDeliveryManUseCase;
  let inMemoryDeliveryMansRepository: InMemoryDeliveryMansRepository;
  let fakeEncrypter: Encrypter;
  let fakeHashComparer: HashComparer;

  beforeEach(() => {
    inMemoryDeliveryMansRepository = new InMemoryDeliveryMansRepository();
    fakeEncrypter = new FakeEncrypter();
    fakeHashComparer = new FakeHashComparer();

    sut = new AuthenticateDeliveryManUseCase(
      inMemoryDeliveryMansRepository,
      fakeEncrypter,
      fakeHashComparer,
    );
  });

  it("should be able possible to login with CPF and password", async () => {
    const deliveryMan = makeDeliveryMan({
      password: "123456",
      cpf: Cpf.createFromValue("12345678900"),
    });
    inMemoryDeliveryMansRepository.items.push(deliveryMan);

    const result = await sut.execute({
      password: "123456",
      cpf: Cpf.createFromValue("12345678900").value,
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    });
  });

  it("should not be possible to authenticate with the invalid password ", async () => {
    const deliveryMan = makeDeliveryMan({
      password: "123456",
      cpf: Cpf.createFromValue("12345678900"),
    });
    inMemoryDeliveryMansRepository.items.push(deliveryMan);

    const result = await sut.execute({
      password: "654321",
      cpf: Cpf.createFromValue("12345678900").value,
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(WrongCredentialsError);
  });

  it("should not be possible to authenticate with the invalid CPF ", async () => {
    const deliveryMan = makeDeliveryMan({
      password: "123456",
      cpf: Cpf.createFromValue("12345678900"),
    });
    inMemoryDeliveryMansRepository.items.push(deliveryMan);

    const result = await sut.execute({
      password: "123456",
      cpf: "12345678900",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(DeliveryManDoesNotExistError);
  });

  it("should not be possible to authenticate a nonexistent administrator", async () => {
    const result = await sut.execute({
      password: "123456",
      cpf: "00987654321",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(DeliveryManDoesNotExistError);
  });
});
