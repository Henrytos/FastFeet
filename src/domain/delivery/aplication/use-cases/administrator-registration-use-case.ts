import { Either, left, right } from '@/core/either';
import { AdministratorsRepository } from '../repositories/administrators-repository';
import { HashGenerator } from '../cryptography/hash-generator';
import { Administrator } from '../../enterprise/entites/administrator';
import { Cpf } from '../../enterprise/entites/value-object/cpf';
import { WrongCredentialsError } from './errors/wrong-credentials-error';
import { Injectable } from '@nestjs/common';

interface AdministratorRegistationUseCaseResquest {
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
export class AdministratorRegistationUseCase {
  constructor(
    private administratorsRepository: AdministratorsRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    cpf,
    password,
  }: AdministratorRegistationUseCaseResquest): Promise<AdministratorsRepositoryResponse> {
    const passwordHash = await this.hashGenerator.hash(password);

    const administratorAlreadyExists =
      await this.administratorsRepository.findByCpf(Cpf.create(cpf));

    if (administratorAlreadyExists) {
      return left(new WrongCredentialsError());
    }

    const administrator = Administrator.create({
      name,
      password: passwordHash,
      cpf: Cpf.create(cpf),
    });

    this.administratorsRepository.create(administrator);

    return right({ administrator });
  }
}
