import { UnqiueEntityID } from "@/core/entities/unique-entity-id";
import {
  DeliveryMan,
  DeliveryManProps,
} from "@/domain/delivery/enterprise/entites/delivery-man";
import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";

export function makeDeliveryMan(
  overwide: Partial<DeliveryManProps> = {},
  id?: UnqiueEntityID
) {
  const deliveryMan = DeliveryMan.create({
    cpf: String(faker.number),
    administratorId: new UnqiueEntityID(randomUUID()),
    name: faker.person.firstName(),
    password: faker.internet.password(),
    ...overwide,
  });

  return deliveryMan;
}
