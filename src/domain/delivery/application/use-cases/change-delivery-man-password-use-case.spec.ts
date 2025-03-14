import { InMemoryAdministratorsRepository } from '@/test/repositories/in-memory-administrators-repository'
import { ChangeDeliveryManPasswordUseCase } from './change-delivery-man-password-use-case'
import { InMemoryDeliveryMansRepository } from '@/test/repositories/in-memory-delivery-mans-repository'
import { FakeHashGenerator } from '@/test/cryptography/fake-hash-generator'
import { makeAdministrator } from '@/test/factories/make-administrator'
import { makeDeliveryMan } from '@/test/factories/make-delivery-man'
import { AdministratorDoesNotExistError } from './errors/administrator-does-not-exist-error'
import { CPF_VALID } from '@/core/constants/cpf-valid'

describe('change delivery man password use case', () => {
  let sut: ChangeDeliveryManPasswordUseCase
  let inMemoryAdministratorsRepository: InMemoryAdministratorsRepository
  let inMemoryDeliveryMansRepository: InMemoryDeliveryMansRepository
  let fakeHashGenerator: FakeHashGenerator

  beforeEach(() => {
    inMemoryAdministratorsRepository = new InMemoryAdministratorsRepository()
    inMemoryDeliveryMansRepository = new InMemoryDeliveryMansRepository()
    fakeHashGenerator = new FakeHashGenerator()

    sut = new ChangeDeliveryManPasswordUseCase(
      inMemoryAdministratorsRepository,
      inMemoryDeliveryMansRepository,
      fakeHashGenerator,
    )
  })

  it('should be possible to change delivery password', async () => {
    const administrator = makeAdministrator()
    inMemoryAdministratorsRepository.items.push(administrator)

    const deliveryMan = makeDeliveryMan({
      password: await fakeHashGenerator.hash('old password'),
    })
    inMemoryDeliveryMansRepository.items.push(deliveryMan)

    const result = await sut.execute({
      administratorId: administrator.id.toString(),
      password: 'new password',
      cpf: deliveryMan.cpf.value,
    })

    expect(result.isRight()).toEqual(true)
    expect(inMemoryDeliveryMansRepository.items).toHaveLength(1)
    expect(inMemoryDeliveryMansRepository.items[0]).toMatchObject({
      props: {
        password: await fakeHashGenerator.hash('new password'),
      },
    })
  })

  it('should not be possible to change the delivery man if there is no delivery', async () => {
    const administrator = makeAdministrator()
    inMemoryAdministratorsRepository.items.push(administrator)

    const result = await sut.execute({
      administratorId: administrator.id.toString(),
      password: 'new password',
      cpf: CPF_VALID,
    })

    expect(result.isLeft()).toEqual(true)
  })

  it("should not be possible to change the delivery man's password if there is no administrator", async () => {
    const administrator = makeAdministrator()
    inMemoryAdministratorsRepository.items.push(administrator)

    const deliveryMan = makeDeliveryMan({
      password: await fakeHashGenerator.hash('old password'),
    })
    inMemoryDeliveryMansRepository.items.push(deliveryMan)

    const result = await sut.execute({
      administratorId: 'invalid-administrator-id',
      password: 'new password',
      cpf: deliveryMan.cpf.value,
    })

    expect(result.isLeft()).toEqual(true)
    expect(inMemoryDeliveryMansRepository.items).toHaveLength(1)
    expect(inMemoryDeliveryMansRepository.items[0]).toMatchObject({
      props: {
        password: await fakeHashGenerator.hash('old password'),
      },
    })
    expect(result.value).toBeInstanceOf(AdministratorDoesNotExistError)
  })
})
