import { Recipient } from '@/domain/delivery/enterprise/entities/recipient';
import { Prisma, Recipient as PrismaRecipient } from '@prisma/client';
export declare class PrismaRecipientMapper {
    static toDomain(raw: PrismaRecipient): Recipient;
    static toPrisma(recipient: Recipient): Prisma.RecipientUncheckedCreateInput;
}
