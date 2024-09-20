import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import {
  Notification,
  NotificationProps,
} from "@/domain/notification/enterprise/entities/notification";
import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";

export function makeNotification(
  overwide?: Partial<NotificationProps>,
  id?: UniqueEntityID
) {
  const notification = Notification.create(
    {
      content: faker.lorem.sentence(),
      recipientId: new UniqueEntityID(randomUUID()),
      title: faker.lorem.sentence(),
      ...overwide,
    },
    id
  );

  return notification;
}
