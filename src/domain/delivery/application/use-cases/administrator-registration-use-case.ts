import { Either, left, right } from "@/core/either";
import { AdministratorsRepository } from "../repositories/administrators-repository";
import { HashGenerator } from "../cryptography/hash-generator";
import { Administrator } from "../../enterprise/entities/administrator";
import { Cpf } from "../../enterprise/entities/value-object/cpf";
import { WrongCredentialsError } from "./errors/wrong-credentials-error";
import { Injectable } from "@nestjs/common";

interface AdministratorRegistrationUseCaseRe {
  name: string;
  cpf: string;
  password: string;
}

type AdministratorsRepositoryResponse = Either<
  WrongCredentialsError,
  {
    administrator: Administrator;
  }
>;

@Injectable()
export class AdministratorRegistrationUseCase {
  constructor(
    private administratorsRepository: AdministratorsRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    cpf,
    password,
  }: AdministratorRegistrationUseCaseRe): Promise<AdministratorsRepositoryResponse> {
    const passwordHash = await this.hashGenerator.hash(password);

    const administratorAlreadyExists =
      await this.administratorsRepository.findByCpf(Cpf.create(cpf));

    if (administratorAlreadyExists) {
      return left(new WrongCredentialsError());
    }

    const administrator = Administrator.create({
      name,
      password: passwordHash,
      cpf: Cpf.createFromValue(cpf),
    });

    this.administratorsRepository.create(administrator);

    return right({ administrator });
  }
}
