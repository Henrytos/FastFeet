import { DeliveryMansRepository } from '@/domain/delivery/application/repositories/delivery-mans-repository';
import { DeliveryMan } from '@/domain/delivery/enterprise/entities/delivery-man';
import { Cpf } from '@/domain/delivery/enterprise/entities/value-object/cpf';
import { PrismaService } from '../prisma.service';
export declare class PrismaDeliveryMansRepository implements DeliveryMansRepository {
    private prisma;
    constructor(prisma: PrismaService);
    fetchDeliveryManByPage(page: number, perPage: number): Promise<DeliveryMan[]>;
    create(deliveryMan: DeliveryMan): Promise<void>;
    findById(id: string): Promise<DeliveryMan | null>;
    findByCpf(cpf: Cpf): Promise<DeliveryMan | null>;
    save(deliveryMan: DeliveryMan): Promise<void>;
    delete(deliveryMan: DeliveryMan): Promise<void>;
    exists(id: string): Promise<boolean>;
}
