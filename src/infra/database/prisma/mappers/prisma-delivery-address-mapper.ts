import { Prisma, Address as PrismaDeliveryAddress } from '@prisma/client';
import { DeliveryAddress } from '@/domain/delivery/enterprise/entities/delivery-address';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export class PrismaDeliveryAddressMapper {
  static toDomain(raw: PrismaDeliveryAddress): DeliveryAddress {
    return DeliveryAddress.create(
      {
        city: raw.city,
        latitude: Number(raw.latitude),
        longitude: Number(raw.longitude),
        neighborhood: raw.neighborhood,
        number: raw.number,
        state: raw.state,
        street: raw.street,
        zip: raw.zip,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(
    deliveryAddress: DeliveryAddress,
  ): Prisma.AddressUncheckedCreateInput {
    return {
      city: deliveryAddress.city,
      latitude: String(deliveryAddress.latitude),
      longitude: String(deliveryAddress.longitude),
      neighborhood: deliveryAddress.neighborhood,
      number: deliveryAddress.number,
      state: deliveryAddress.state,
      street: deliveryAddress.street,
      zip: deliveryAddress.zip,
    };
  }
}
