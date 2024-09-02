import { UnqiueEntityID } from "@/core/entities/unique-entity-id";
import {
  DeliveryMan,
  DeliveryManProps,
} from "@/domain/delivery/enterprise/entites/delivery-man";
import { Cpf } from "@/domain/delivery/enterprise/entites/value-object/cpf";
import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";

export function makeDeliveryMan(
  overwide: Partial<DeliveryManProps> = {},
  id?: UnqiueEntityID
) {
  const deliveryMan = DeliveryMan.create({
    cpf: Cpf.createFromValue(
      faker.number.int({ min: 10000000000, max: 99999999999 }).toString()
    ),
    administratorId: new UnqiueEntityID(randomUUID()),
    name: faker.person.firstName(),
    password: faker.internet.password(),
    ...overwide,
  });

  return deliveryMan;
}
