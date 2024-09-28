import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import {
  Recipient,
  RecipientProps,
} from '@/domain/delivery/enterprise/entities/recipient';
import { faker } from '@faker-js/faker';

export function makeRecipient(
  overwide: Partial<RecipientProps> = {},
  id?: UniqueEntityID,
) {
  const recipient = Recipient.create(
    {
      email: faker.internet.email(),
      name: faker.person.firstName(),
      ...overwide,
    },
    id,
  );
  return recipient;
}
