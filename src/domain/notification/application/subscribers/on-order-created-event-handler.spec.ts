import { InMemoryNotificationsRepository } from '@/test/repositories/in-memory-notifications-repository'
import {
  SendNotificationUseCase,
  SendNotificationUseCaseRequest,
  SendNotificationUseCaseResponse,
} from '../use-cases/send-notification-use-case'
import { makeOrder } from '@/test/factories/make-order'
import { makeRecipient } from '@/test/factories/make-recipient'
import { InMemoryOrdersRepository } from '@/test/repositories/in-memory-orders-repository'
import { InMemoryRecipientsRepository } from '@/test/repositories/in-memory-recipients-repository'
import { InMemoryDeliveryAddressRepository } from '@/test/repositories/in-memory-delivery-address-repository'
import { waitFor } from '@/test/utils/wait-for'
/** ******* 
  For Resolve this error read
  https://vitest.dev/guide/migration.html#mock-types-4400
 *********/
import { SpyInstance } from 'vitest'

import { OnOrderCreatedEventHandler } from './on-order-created-event-handler'
import { ORDER_STATUS } from '@/core/constants/order-status.enum'
import { FakerSendEmailToUser } from '@/test/email/faker-send-email-to-user'

let sendNotificationUseCase: SendNotificationUseCase
let inMemoryNotificationsRepository: InMemoryNotificationsRepository

let inMemoryRecipientsRepository: InMemoryRecipientsRepository
let inMemoryOrdersRepository: InMemoryOrdersRepository
let inMemoryDeliveryAddressRepository: InMemoryDeliveryAddressRepository
let fakerSendEmailToUser: FakerSendEmailToUser
let sendNotificationExecuteSpy: SpyInstance<
  [SendNotificationUseCaseRequest],
  SendNotificationUseCaseResponse
>

describe('On Answer Created', () => {
  beforeEach(() => {
    inMemoryDeliveryAddressRepository = new InMemoryDeliveryAddressRepository()
    inMemoryRecipientsRepository = new InMemoryRecipientsRepository(
      inMemoryOrdersRepository,
      inMemoryDeliveryAddressRepository,
    )

    inMemoryOrdersRepository = new InMemoryOrdersRepository(
      inMemoryDeliveryAddressRepository,
      inMemoryRecipientsRepository,
    )

    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()

    fakerSendEmailToUser = new FakerSendEmailToUser()
    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationsRepository,
      inMemoryRecipientsRepository,
      fakerSendEmailToUser,
    )
    new OnOrderCreatedEventHandler(sendNotificationUseCase)
    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute')
  })

  it('should  send a notification when an order is created', async () => {
    const recipient = makeRecipient()
    inMemoryRecipientsRepository.create(recipient)
    const order = makeOrder({
      recipientId: recipient.id,
    })
    order.status = ORDER_STATUS.PENDING
    inMemoryOrdersRepository.save(order)

    waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    })
  })
})
