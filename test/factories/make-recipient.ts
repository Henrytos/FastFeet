import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import {
  Recipient,
  RecipientProps,
} from "@/domain/delivery/enterprise/entites/recipient";
import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";

export function makeRecipient(
  overwide: Partial<RecipientProps> = {},
  id?: UniqueEntityID
) {
  const recipient = Recipient.create(
    {
      deliveryAddressId: new UniqueEntityID(randomUUID()),
      email: faker.internet.email(),
      name: faker.person.firstName(),
      ...overwide,
    },
    id
  );
  return recipient;
}
