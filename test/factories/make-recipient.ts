import { UnqiueEntityID } from "@/core/entities/unique-entity-id";
import {
  Recipient,
  RecipientProps,
} from "@/domain/delivery/enterprise/entites/recipient";
import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";

export function makeRecipient(
  overwide: Partial<RecipientProps> = {},
  id?: UnqiueEntityID
) {
  const recipient = Recipient.create(
    {
      deliveryAddressId: new UnqiueEntityID(randomUUID()),
      email: faker.internet.email(),
      name: faker.person.firstName(),
      ...overwide,
    },
    id
  );
  return recipient;
}
