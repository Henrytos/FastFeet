import { DeliveryAddressRepository } from '@/domain/delivery/application/repositories/delivery-address-repository';
import { DeliveryAddress } from '@/domain/delivery/enterprise/entities/delivery-address';
import { PrismaService } from '../prisma.service';
export declare class PrismaDeliveryAddressRepository implements DeliveryAddressRepository {
    private prisma;
    constructor(prisma: PrismaService);
    findById(id: string): Promise<DeliveryAddress | null>;
    delete(id: string): Promise<void>;
    create(deliveryAddress: DeliveryAddress): Promise<void>;
    save(deliveryAddress: DeliveryAddress): Promise<void>;
    exists(id: string): Promise<boolean>;
}
