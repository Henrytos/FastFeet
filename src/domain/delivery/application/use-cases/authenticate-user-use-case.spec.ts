import { FakeEncrypter } from '@/test/cryptography/fake-encrypter'
import { FakeHashComparer } from '@/test/cryptography/fake-hash-comparer'
import { Encrypter } from '../cryptography/encrypter'
import { HashComparer } from '../cryptography/hash-comparer'
import { WrongCredentialsError } from './errors/wrong-credentials-error'
import { Cpf } from '../../enterprise/entities/value-object/cpf'
import { InMemoryDeliveryMansRepository } from '@/test/repositories/in-memory-delivery-mans-repository'
import { makeDeliveryMan } from '@/test/factories/make-delivery-man'
import { AuthenticateUserUseCase } from './authenticate-user-use-case'
import { InMemoryAdministratorsRepository } from '@/test/repositories/in-memory-administrators-repository'
import { CPF_VALID } from '@/core/constants/cpf-valid'
import { makeAdministrator } from '@/test/factories/make-administrator'

describe('authenticate administrator use case', () => {
  let sut: AuthenticateUserUseCase
  let inMemoryDeliveryMansRepository: InMemoryDeliveryMansRepository
  let inMemoryAdministratorsRepository: InMemoryAdministratorsRepository
  let fakeEncrypter: Encrypter
  let fakeHashComparer: HashComparer

  beforeEach(() => {
    inMemoryDeliveryMansRepository = new InMemoryDeliveryMansRepository()
    inMemoryAdministratorsRepository = new InMemoryAdministratorsRepository()
    fakeEncrypter = new FakeEncrypter()
    fakeHashComparer = new FakeHashComparer()

    sut = new AuthenticateUserUseCase(
      inMemoryDeliveryMansRepository,
      inMemoryAdministratorsRepository,
      fakeEncrypter,
      fakeHashComparer,
    )
  })

  it('should be able possible to login with CPF and password deliveryMan', async () => {
    const deliveryMan = makeDeliveryMan({
      password: '123456',
      cpf: Cpf.create(CPF_VALID),
    })
    inMemoryDeliveryMansRepository.items.push(deliveryMan)

    const result = await sut.execute({
      password: '123456',
      cpf: Cpf.create(CPF_VALID).value,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })

  it('should be able possible to login with CPF and password administrator', async () => {
    const administrator = makeAdministrator({
      password: '123456',
      cpf: Cpf.create(CPF_VALID),
    })
    inMemoryAdministratorsRepository.items.push(administrator)

    const result = await sut.execute({
      password: '123456',
      cpf: Cpf.create(CPF_VALID).value,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })

  it('should not be possible to authenticate with the invalid password deliveryMan', async () => {
    const deliveryMan = makeDeliveryMan({
      password: '123456',
      cpf: Cpf.create(CPF_VALID),
    })
    inMemoryDeliveryMansRepository.items.push(deliveryMan)

    const result = await sut.execute({
      password: '654321',
      cpf: Cpf.create(CPF_VALID).value,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(WrongCredentialsError)
  })

  it('should not be possible to authenticate with the invalid password administrator', async () => {
    const deliveryMan = makeAdministrator({
      password: '123456',
      cpf: Cpf.create(CPF_VALID),
    })
    inMemoryAdministratorsRepository.items.push(deliveryMan)

    const result = await sut.execute({
      password: '654321',
      cpf: Cpf.create(CPF_VALID).value,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(WrongCredentialsError)
  })
  it('should not be possible to authenticate a nonexistent administrator', async () => {
    const result = await sut.execute({
      password: '123456',
      cpf: CPF_VALID,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(WrongCredentialsError)
  })
})
