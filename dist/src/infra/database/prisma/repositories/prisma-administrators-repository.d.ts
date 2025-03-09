import { AdministratorsRepository } from '@/domain/delivery/application/repositories/administrators-repository';
import { PrismaService } from '../prisma.service';
import { Cpf } from '@/domain/delivery/enterprise/entities/value-object/cpf';
import { Administrator } from '@/domain/delivery/enterprise/entities/administrator';
export declare class PrismaAdministratorsRepository implements AdministratorsRepository {
    private prisma;
    constructor(prisma: PrismaService);
    findByCpf(cpf: Cpf): Promise<Administrator | null>;
    findById(id: string): Promise<Administrator | null>;
    create(administrator: Administrator): Promise<void>;
    exists(id: string): Promise<boolean>;
}
