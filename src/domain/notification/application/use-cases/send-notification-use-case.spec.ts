import { InMemoryNotificationsRepository } from '@/test/repositories/in-memory-notifications-repository'
import { SendNotificationUseCase } from './send-notification-use-case'

describe('send notification use case', () => {
  let sut: SendNotificationUseCase
  let inMemoryNotificationsRepository: InMemoryNotificationsRepository

  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sut = new SendNotificationUseCase(inMemoryNotificationsRepository)
  })

  it('should be possible to send notification to the destination', async () => {
    const result = await sut.execute({
      recipientId: '1',
      title: 'example-test',
      content: 'example-content',
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryNotificationsRepository.items).toHaveLength(1)
  })
})
