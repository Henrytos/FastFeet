import { InMemoryAdministratorsRepository } from '@/test/repositories/in-memory-administrators-repository';
import { AdministratorRegistrationUseCase } from './administrator-registration-use-case';
import { FakeHashGenerator } from '@/test/cryptography/fake-hash-generator';

describe('administrator registration use case', () => {
  let sut: AdministratorRegistrationUseCase;
  let inMemoryAdministratorsRepository: InMemoryAdministratorsRepository;
  let fakeHashGenerator: FakeHashGenerator;

  beforeEach(() => {
    inMemoryAdministratorsRepository = new InMemoryAdministratorsRepository();
    fakeHashGenerator = new FakeHashGenerator();
    sut = new AdministratorRegistrationUseCase(
      inMemoryAdministratorsRepository,
      fakeHashGenerator,
    );
  });

  it('should be able to register a new administrator', async () => {
    const result = await sut.execute({
      cpf: '12345678900',
      name: 'any_name',
      password: '123456',
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryAdministratorsRepository.items).toHaveLength(1);
  });
});
