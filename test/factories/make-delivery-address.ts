import { UnqiueEntityID } from "@/core/entities/unique-entity-id";
import {
  DeliveryAddress,
  DeliveryAddressProps,
} from "@/domain/delivery/enterprise/entites/delivery-address";
import { faker } from "@faker-js/faker";

export function makeDeliveryAddress(
  overwide: Partial<DeliveryAddressProps> = {},
  id?: UnqiueEntityID
) {
  const deliveryAddress = DeliveryAddress.create({
    state: faker.lorem.paragraph(),
    neighborhood: faker.lorem.paragraph(),
    street: faker.lorem.paragraph(),
    zip: faker.lorem.paragraph(),
    city: faker.lorem.paragraph(),
    number: String(Math.ceil(Math.random() * 1000)),
    latitude: Math.ceil(Math.random() * 10000),
    longitude: Math.ceil(Math.random() * 10000),
    ...overwide,
  });

  return deliveryAddress;
}
