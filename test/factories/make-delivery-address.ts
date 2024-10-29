import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import {
  DeliveryAddress,
  DeliveryAddressProps,
} from "@/domain/delivery/enterprise/entities/delivery-address";
import { PrismaDeliveryAddressMapper } from "@/infra/database/prisma/mappers/prisma-delivery-address-mapper";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { faker } from "@faker-js/faker";
import { Injectable } from "@nestjs/common";

export function makeDeliveryAddress(
  overwide: Partial<DeliveryAddressProps> = {},
  id?: UniqueEntityID,
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

@Injectable()
export class DeliveryAddressFactory {
  constructor(private prisma: PrismaService) {}

  async makeDeliveryAddress(overwide: Partial<DeliveryAddressProps> = {}) {
    const deliveryAddress = makeDeliveryAddress(overwide);

    const prismaDeliveryAddress = await this.prisma.address.create({
      data: PrismaDeliveryAddressMapper.toPrisma(deliveryAddress),
    });

    return prismaDeliveryAddress;
  }
}
