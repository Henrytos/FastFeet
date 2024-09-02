import { UnqiueEntityID } from "@/core/entities/unique-entity-id";
import {
  Administrator,
  AdministratorProps,
} from "@/domain/delivery/enterprise/entites/administrator";
import { faker } from "@faker-js/faker";

export function makeAdministrator(
  overwide: Partial<AdministratorProps> = {},
  id?: UnqiueEntityID
) {
  const administrator = Administrator.create(
    {
      id: new UnqiueEntityID(),
      cpf: faker.lorem.text(),
      name: faker.internet.userName(),
      password: faker.internet.password(),
      ...overwide,
    },
    id
  );
  return administrator;
}
