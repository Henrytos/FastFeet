import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import {
  Administrator,
  AdministratorProps,
} from '@/domain/delivery/enterprise/entities/administrator';
import { Cpf } from '@/domain/delivery/enterprise/entities/value-object/cpf';
import { faker } from '@faker-js/faker';

export function makeAdministrator(
  overwide: Partial<AdministratorProps> = {},
  id?: UniqueEntityID,
) {
  const administrator = Administrator.create(
    {
      cpf: Cpf.createFromValue(
        faker.number.int({ min: 10000000000, max: 99999999999 }).toString(),
      ),
      name: faker.internet.userName(),
      password: faker.internet.password(),
      ...overwide,
    },
    id,
  );
  return administrator;
}
