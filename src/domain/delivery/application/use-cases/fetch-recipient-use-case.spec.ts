import { InMemoryRecipientsRepository } from '@/test/repositories/in-memory-recipients-repository'
import { FetchRecipientUseCase } from './fetch-recipient-use-case'
import { InMemoryAdministratorsRepository } from '@/test/repositories/in-memory-administrators-repository'
import { InMemoryOrdersRepository } from '@/test/repositories/in-memory-orders-repository'
import { InMemoryDeliveryAddressRepository } from '@/test/repositories/in-memory-delivery-address-repository'
import { makeRecipient } from '@/test/factories/make-recipient'
import { makeAdministrator } from '@/test/factories/make-administrator'
import { AdministratorDoesNotExistError } from './errors/administrator-does-not-exist-error'

describe('fetch recipient use case', () => {
  let sut: FetchRecipientUseCase
  let inMemoryOrdersRepository: InMemoryOrdersRepository
  let inMemoryDeliveryAddressRepository: InMemoryDeliveryAddressRepository
  let inMemoryRecipientsRepository: InMemoryRecipientsRepository
  let inMemoryAdministratorRepository: InMemoryAdministratorsRepository

  beforeEach(() => {
    inMemoryDeliveryAddressRepository = new InMemoryDeliveryAddressRepository()
    inMemoryOrdersRepository = new InMemoryOrdersRepository(
      inMemoryDeliveryAddressRepository,
    )

    inMemoryRecipientsRepository = new InMemoryRecipientsRepository(
      inMemoryOrdersRepository,
      inMemoryDeliveryAddressRepository,
    )
    inMemoryAdministratorRepository = new InMemoryAdministratorsRepository()

    sut = new FetchRecipientUseCase(
      inMemoryRecipientsRepository,
      inMemoryAdministratorRepository,
    )
  })

  it('should be possible to list the registered destinations', async () => {
    for (let index = 0; index < 21; index++) {
      inMemoryRecipientsRepository.items.push(makeRecipient())
    }

    const administrator = makeAdministrator()
    inMemoryAdministratorRepository.items.push(administrator)

    const result = await sut.execute({
      administratorId: administrator.id.toString(),
      page: 1,
      perPage: 10,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toHaveProperty('recipients')
    expect(result.value).toMatchObject({
      recipients: expect.arrayContaining([expect.any(Object)]),
    })
  })

  it('não deveria ser possivel listar destinatarios se não for um admin', async () => {
    for (let index = 0; index < 21; index++) {
      inMemoryRecipientsRepository.items.push(makeRecipient())
    }

    const result = await sut.execute({
      administratorId: 'invalid-administrator-id',
      page: 1,
      perPage: 10,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(AdministratorDoesNotExistError)
  })
})
