import { Either, left, right } from "@/core/either";
import { Encrypter } from "../cryptography/encrypter";
import { HashComparer } from "../cryptography/hash-comparer";
import { AdministratorsRepository } from "../repositories/administrators-repository";
import { AdministratorDoesNotExistError } from "./errors/administrator-does-not-exist-error";
import { WrongCredentialsError } from "./errors/wrong-credentials-error";
import { Cpf } from "../../enterprise/entites/value-object/cpf";

interface AuthenticateAdministratorUseCaseRequest {
  cpf: string;
  password: string;
}
type AuthenticateAdministratorUseCaseResponse = Either<
  AdministratorDoesNotExistError | WrongCredentialsError,
  {
    accessToken: string;
  }
>;

export class AuthenticateAdministratorUseCase {
  constructor(
    private administratorsRepository: AdministratorsRepository,
    private encrypter: Encrypter,
    private hashComparer: HashComparer
  ) {}

  async execute({
    cpf,
    password,
  }: AuthenticateAdministratorUseCaseRequest): Promise<AuthenticateAdministratorUseCaseResponse> {
    const administrator = await this.administratorsRepository.findByCpf(
      Cpf.createFromValue(cpf)
    );

    if (!administrator) {
      return left(new AdministratorDoesNotExistError());
    }

    const passwordMatch = await this.hashComparer.comparer(
      password,
      administrator.password
    );

    if (!passwordMatch) {
      return left(new WrongCredentialsError());
    }

    const accessToken = await this.encrypter.encrypt({
      sub: administrator.id.toString(),
    });

    return right({ accessToken });
  }
}
