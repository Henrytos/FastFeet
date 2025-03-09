import { Prisma, Order as PrismaOrder } from '@prisma/client';
import { Order } from '@/domain/delivery/enterprise/entities/order';
export declare class PrismaOrderMapper {
    static toDomain(raw: PrismaOrder): Order;
    static toPrisma(order: Order): Prisma.OrderUncheckedCreateInput;
}
