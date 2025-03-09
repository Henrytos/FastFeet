import { DeliveryMan } from '@/domain/delivery/enterprise/entities/delivery-man';
import { Prisma, User as PrismaDeliveryMan } from '@prisma/client';
export declare class PrismaDeliveryManMapper {
    static toDomain(raw: PrismaDeliveryMan): DeliveryMan;
    static toPrisma(deliveryMan: DeliveryMan): Prisma.UserUncheckedCreateInput;
}
