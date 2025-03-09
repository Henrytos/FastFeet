import { OrderWithDetails } from '@/domain/delivery/enterprise/entities/value-object/order-with-details';
import { Order as PrismaOrder, Address as PrismaAddress, Recipient as PrismaRecipient } from '@prisma/client';
type PrismaOrderWithDetails = PrismaOrder & {
    address: PrismaAddress;
    recipient: PrismaRecipient;
};
export declare class PrismaOrderWithDetailsMapper {
    static toDomain(raw: PrismaOrderWithDetails): OrderWithDetails;
}
export {};
