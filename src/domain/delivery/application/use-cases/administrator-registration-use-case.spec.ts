import { InMemoryAdministratorsRepository } from '@/test/repositories/in-memory-administrators-repository'
import { AdministratorRegistrationUseCase } from './administrator-registration-use-case'
import { FakeHashGenerator } from '@/test/cryptography/fake-hash-generator'
import { makeAdministrator } from '@/test/factories/make-administrator'
import { Cpf } from '../../enterprise/entities/value-object/cpf'
import { WrongCredentialsError } from './errors/wrong-credentials-error'

describe('administrator registration use case', () => {
  let sut: AdministratorRegistrationUseCase
  let inMemoryAdministratorsRepository: InMemoryAdministratorsRepository
  let fakeHashGenerator: FakeHashGenerator

  beforeEach(() => {
    inMemoryAdministratorsRepository = new InMemoryAdministratorsRepository()
    fakeHashGenerator = new FakeHashGenerator()
    sut = new AdministratorRegistrationUseCase(
      inMemoryAdministratorsRepository,
      fakeHashGenerator,
    )
  })

  it('should be able to register a new administrator', async () => {
    const result = await sut.execute({
      cpf: '12345678900',
      name: 'any_name',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAdministratorsRepository.items).toHaveLength(1)
  })

  it('It should not be possible to create an administrator with repeated CPF', async () => {
    const administrator = makeAdministrator({
      cpf: Cpf.create('12345678900'),
    })
    inMemoryAdministratorsRepository.items.push(administrator)

    const result = await sut.execute({
      cpf: administrator.cpf.value,
      name: 'any_name',
      password: '123456',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(WrongCredentialsError)
    expect(inMemoryAdministratorsRepository.items).toHaveLength(1)
  })
})
