import { InMemoryNotificationsRepository } from '@/test/repositories/in-memory-notifications-repository';
import { makeNotification } from '@/test/factories/make-notification';
import { ReadNotificationUseCase } from './read-notification-use-case';
import { WrongCredentialsError } from '@/domain/delivery/application/use-cases/errors/wrong-credentials-error';
import { NotificationDoesNotExistsError } from './errors/notification-does-not-exists-error';

describe('Read notification use case', () => {
  let sut: ReadNotificationUseCase;
  let inMemoryNotificationsRepository: InMemoryNotificationsRepository;

  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    sut = new ReadNotificationUseCase(inMemoryNotificationsRepository);
  });

  it('should be possible to read notification', async () => {
    const notification = makeNotification();
    inMemoryNotificationsRepository.items.push(notification);
    const result = await sut.execute({
      recipientId: notification.recipientId.toString(),
      notificationId: notification.id.toString(),
    });

    expect(result.isRight()).toEqual(true);
  });

  it('should not be possible to read notification if it does not exist ', async () => {
    const notification = makeNotification();

    const result = await sut.execute({
      recipientId: notification.recipientId.toString(),
      notificationId: notification.id.toString(),
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(NotificationDoesNotExistsError);
  });

  it('should not be possible to read notification if you are not intended ', async () => {
    const notification = makeNotification({
      readAt: undefined,
    });
    inMemoryNotificationsRepository.items.push(notification);

    const result = await sut.execute({
      recipientId: 'invalid-recipient-id',
      notificationId: notification.id.toString(),
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(WrongCredentialsError);
    expect(inMemoryNotificationsRepository.items[0]).toMatchObject({
      props: {
        readAt: undefined,
      },
    });
  });
});
