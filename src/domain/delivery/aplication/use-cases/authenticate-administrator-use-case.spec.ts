import { InMemoryAdministratorsRepository } from "@/test/repositories/in-memory-administrators-repository";
import { AuthenticateAdministratorUseCase } from "./authenticate-administrator-use-case";
import { FakeEncrypter } from "@/test/cryptography/fake-encrypter";
import { FakeHashComparer } from "@/test/cryptography/fake-hash-comparer";
import { makeAdministrator } from "@/test/factories/make-administrator";
import { Encrypter } from "../cryptography/encrypter";
import { HashComparer } from "../cryptography/hash-comparer";
import { WrongCredentialsError } from "./errors/wrong-credentials-error";
import { AdministratorDoesNotExistError } from "./errors/administrator-does-not-exist-error";

describe("authenticate administrator use case", () => {
  let sut: AuthenticateAdministratorUseCase;
  let inMemoryadministratorsRepository: InMemoryAdministratorsRepository;
  let fakeEncrypter: Encrypter;
  let fakeHashComparer: HashComparer;
  beforeEach(() => {
    inMemoryadministratorsRepository = new InMemoryAdministratorsRepository();
    fakeEncrypter = new FakeEncrypter();
    fakeHashComparer = new FakeHashComparer();
    sut = new AuthenticateAdministratorUseCase(
      inMemoryadministratorsRepository,
      fakeEncrypter,
      fakeHashComparer
    );
  });

  it("should be able possible to log in with CPF and password", async () => {
    const administrator = makeAdministrator({
      password: "123456",
      cpf: "12345678900",
    });

    inMemoryadministratorsRepository.items.push(administrator);

    const result = await sut.execute({
      password: "123456",
      cpf: "12345678900",
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    });
  });

  it("should not be possible to authenticate with the invalid password ", async () => {
    const administrator = makeAdministrator({
      password: "123456",
      cpf: "12345678900",
    });

    inMemoryadministratorsRepository.items.push(administrator);

    const result = await sut.execute({
      password: "654321",
      cpf: "12345678900",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(WrongCredentialsError);
  });

  it("should not be possible to authenticate with the invalid CPF ", async () => {
    const administrator = makeAdministrator({
      password: "123456",
      cpf: "12345678900",
    });

    inMemoryadministratorsRepository.items.push(administrator);

    const result = await sut.execute({
      password: "123456",
      cpf: "00987654321",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(AdministratorDoesNotExistError);
  });

  it("should not be possible to authenticate a nonexistent administrator", async () => {
    const result = await sut.execute({
      password: "123456",
      cpf: "00987654321",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(AdministratorDoesNotExistError);
  });
});
