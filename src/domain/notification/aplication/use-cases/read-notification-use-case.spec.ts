import { InMemoryNotificationsRepository } from "@/test/repositories/in-memory-notifications-repository";
import { makeNotification } from "@/test/factories/make-notification";
import { ReadNotificationUseCase } from "./read-notification-use-case";
import { WrongCredentialsError } from "@/domain/delivery/aplication/use-cases/errors/wrong-credentials-error";
import { NotificationDoesNotExistsError } from "./errors/notification-does-not-exists-error";

describe("Read notification use case", () => {
  let sut: ReadNotificationUseCase;
  let inMemoryNotificationsRepository: InMemoryNotificationsRepository;

  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    sut = new ReadNotificationUseCase(inMemoryNotificationsRepository);
  });

  it("deveria ser possivel ler notificação ", async () => {
    const notification = makeNotification();
    inMemoryNotificationsRepository.items.push(notification);
    const result = await sut.execute({
      recipientId: notification.recipientId.toString(),
      notificationId: notification.id.toString(),
    });

    expect(result.isRight()).toEqual(true);
  });

  it("não deveria ser possivel ler notificação se não existe ", async () => {
    const notification = makeNotification();

    const result = await sut.execute({
      recipientId: notification.recipientId.toString(),
      notificationId: notification.id.toString(),
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(NotificationDoesNotExistsError);
  });

  it("não deveria ser possivel ler notificação se voce não for destinatario ", async () => {
    const notification = makeNotification({
      readAt: undefined,
    });
    inMemoryNotificationsRepository.items.push(notification);

    const result = await sut.execute({
      recipientId: "invalid-recipient-id",
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
