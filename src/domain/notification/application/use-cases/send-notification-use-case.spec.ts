import { InMemoryNotificationsRepository } from '@/test/repositories/in-memory-notifications-repository'
import { SendNotificationUseCase } from './send-notification-use-case'
import { FakerSendEmailToUser } from '@/test/email/faker-send-email-to-user'
import { InMemoryRecipientsRepository } from '@/test/repositories/in-memory-recipients-repository'
import { InMemoryDeliveryAddressRepository } from '@/test/repositories/in-memory-delivery-address-repository'
import { InMemoryOrdersRepository } from '@/test/repositories/in-memory-orders-repository'
import { makeRecipient } from '@/test/factories/make-recipient'
import { RecipientDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/recipient-does-not-exist-error'

describe('send notification use case', () => {
  let sut: SendNotificationUseCase
  let inMemoryNotificationsRepository: InMemoryNotificationsRepository
  let inMemoryDeliveryAddressRepository: InMemoryDeliveryAddressRepository
  let inMemoryOrdersRepository: InMemoryOrdersRepository
  let inMemoryRecipientsRepository: InMemoryRecipientsRepository
  let fakerSendEmailToUser: FakerSendEmailToUser

  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()

    inMemoryOrdersRepository = new InMemoryOrdersRepository(
      inMemoryDeliveryAddressRepository,
      inMemoryRecipientsRepository,
    )
    inMemoryDeliveryAddressRepository = new InMemoryDeliveryAddressRepository()
    inMemoryRecipientsRepository = new InMemoryRecipientsRepository(
      inMemoryOrdersRepository,
      inMemoryDeliveryAddressRepository,
    )

    fakerSendEmailToUser = new FakerSendEmailToUser()

    sut = new SendNotificationUseCase(
      inMemoryNotificationsRepository,
      inMemoryRecipientsRepository,
      fakerSendEmailToUser,
    )
  })

  it('should be possible to send notification to the destination', async () => {
    const recipient = makeRecipient({
      email: 'franzhenry46@gmail.com',
    })
    inMemoryRecipientsRepository.items.push(recipient)

    const result = await sut.execute({
      recipientId: recipient.id.toString(),
      title: 'example-test',
      content: 'example-content',
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryNotificationsRepository.items).toHaveLength(1)
  })

  it('should not send email if there is no destination', async () => {
    const result = await sut.execute({
      recipientId: 'invalid-recipient-id',
      title: 'example-test',
      content: 'example-content',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(RecipientDoesNotExistError)
  })
})
