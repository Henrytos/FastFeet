import { Prisma, Address as PrismaDeliveryAddress } from '@prisma/client';
import { DeliveryAddress } from '@/domain/delivery/enterprise/entities/delivery-address';
export declare class PrismaDeliveryAddressMapper {
    static toDomain(raw: PrismaDeliveryAddress): DeliveryAddress;
    static toPrisma(deliveryAddress: DeliveryAddress): Prisma.AddressUncheckedCreateInput;
}
