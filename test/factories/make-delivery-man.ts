import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import {
  DeliveryMan,
  DeliveryManProps,
} from '@/domain/delivery/enterprise/entities/delivery-man';
import { Cpf } from '@/domain/delivery/enterprise/entities/value-object/cpf';
import { PrismaDeliveryManMapper } from '@/infra/database/prisma/mappers/prisma-delivery-man-mapper';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

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

@Injectable()
export class DeliveryManFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaDeliveryMan(overwide: Partial<DeliveryManProps> = {}) {
    const deliveryMan = makeDeliveryMan(overwide);

    const prismaDeliveryMan = await this.prisma.user.create({
      data: PrismaDeliveryManMapper.toPrisma(deliveryMan),
    });

    return prismaDeliveryMan;
  }
}
