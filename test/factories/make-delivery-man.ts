import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import {
  DeliveryMan,
  DeliveryManProps,
} from '@/domain/delivery/enterprise/entities/delivery-man';
import { Cpf } from '@/domain/delivery/enterprise/entities/value-object/cpf';
import { faker } from '@faker-js/faker';

export function makeDeliveryMan(
  overwide: Partial<DeliveryManProps> = {},
  id?: UniqueEntityID,
) {
  const deliveryMan = DeliveryMan.create({
    cpf: Cpf.createFromValue(
      faker.number.int({ min: 10000000000, max: 99999999999 }).toString(),
    ),
    name: faker.person.firstName(),
    password: faker.internet.password(),
    ...overwide,
  });

  return deliveryMan;
}
