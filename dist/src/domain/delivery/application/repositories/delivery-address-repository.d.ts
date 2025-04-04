import { DeliveryAddress } from '@/domain/delivery/enterprise/entities/delivery-address';
export declare abstract class DeliveryAddressRepository {
    abstract findById(id: string): Promise<DeliveryAddress | null>;
    abstract delete(id: string): Promise<void>;
    abstract create(deliveryAddress: DeliveryAddress): Promise<void>;
    abstract save(deliveryAddress: DeliveryAddress): Promise<void>;
    abstract exists(id: string): Promise<boolean>;
}
