import { ORDER_STATUS } from '@/core/constants/order-status.enum';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { ValueObject } from '@/core/entities/value-object';
interface OrderWithDetailsProps {
    order: {
        orderId: UniqueEntityID;
        status: ORDER_STATUS;
        createdAt: Date;
        withdrawnAt?: Date | null;
        deliveryAt?: Date | null;
    };
    recipient: {
        recipientId: UniqueEntityID;
        name: string;
    };
    address: {
        addressId: UniqueEntityID;
        state: string;
        city: string;
        neighborhood: string;
        street: string;
        zip: string;
        number: string;
    };
}
export declare class OrderWithDetails extends ValueObject<OrderWithDetailsProps> {
    static create(vo: OrderWithDetailsProps): OrderWithDetails;
    get order(): {
        orderId: UniqueEntityID;
        status: ORDER_STATUS;
        createdAt: Date;
        withdrawnAt?: Date | null;
        deliveryAt?: Date | null;
    };
    get recipient(): {
        recipientId: UniqueEntityID;
        name: string;
    };
    get address(): {
        addressId: UniqueEntityID;
        state: string;
        city: string;
        neighborhood: string;
        street: string;
        zip: string;
        number: string;
    };
}
export {};
