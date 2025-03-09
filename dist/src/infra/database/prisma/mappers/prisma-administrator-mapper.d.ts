import { Administrator } from '@/domain/delivery/enterprise/entities/administrator';
import { Prisma, User as PrismaAdministrator } from '@prisma/client';
export declare class PrismaAdministratorMapper {
    static toDomain(raw: PrismaAdministrator): Administrator;
    static toPrisma(administrator: Administrator): Prisma.UserUncheckedCreateInput;
}
