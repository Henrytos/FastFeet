import { InMemoryRecipientsRepository } from '@/test/repositories/in-memory-recipients-repository'
import { GetRecipientUseCase } from './get-recipient-use-case'
import { makeRecipient } from '@/test/factories/make-recipient'
import { RecipientDoesNotExistError } from './errors/recipient-does-not-exist-error'
import { InMemoryOrdersRepository } from '@/test/repositories/in-memory-orders-repository'
import { InMemoryDeliveryAddressRepository } from '@/test/repositories/in-memory-delivery-address-repository'
import { InMemoryAdministratorsRepository } from '@/test/repositories/in-memory-administrators-repository'
import { makeAdministrator } from '@/test/factories/make-administrator'
import { AdministratorDoesNotExistError } from './errors/administrator-does-not-exist-error'

describe('get recipient by id use case', () => {
  let sut: GetRecipientUseCase
  let inMemoryRecipientsRepository: InMemoryRecipientsRepository
  let inMemoryOrdersRepository: InMemoryOrdersRepository
  let inMemoryDeliveryAddressRepository: InMemoryDeliveryAddressRepository
  let inMemoryAdministratorsRepository: InMemoryAdministratorsRepository

  beforeEach(() => {
    inMemoryAdministratorsRepository = new InMemoryAdministratorsRepository()
    inMemoryRecipientsRepository = new InMemoryRecipientsRepository(
      inMemoryOrdersRepository,
      inMemoryDeliveryAddressRepository,
    )
    sut = new GetRecipientUseCase(
      inMemoryRecipientsRepository,
      inMemoryAdministratorsRepository,
    )
  })

  it('should return an recipient by the id', async () => {
    const administrator = makeAdministrator()
    inMemoryAdministratorsRepository.items.push(administrator)

    const recipient = makeRecipient()
    inMemoryRecipientsRepository.items.push(recipient)

    const result = await sut.execute({
      recipientId: recipient.id.toString(),
      administratorId: administrator.id.toString(),
    })

    expect(result.isRight()).toEqual(true)
    expect(result.value).toMatchObject({ recipient })
  })

  it('should not return if it does not exist', async () => {
    const administrator = makeAdministrator()
    inMemoryAdministratorsRepository.items.push(administrator)

    const result = await sut.execute({
      recipientId: 'invalid-recipient-id',
      administratorId: administrator.id.toString(),
    })

    expect(result.isLeft()).toEqual(true)
    expect(result.value).toBeInstanceOf(RecipientDoesNotExistError)
  })

  it('should not return to destineario if it is not an administrator', async () => {
    const recipient = makeRecipient()
    inMemoryRecipientsRepository.items.push(recipient)

    const result = await sut.execute({
      recipientId: recipient.id.toString(),
      administratorId: 'invalid-administrator-id',
    })

    expect(result.isLeft()).toEqual(true)
    expect(result.value).toBeInstanceOf(AdministratorDoesNotExistError)
  })
})
