import { OrderWithDetails } from '@/domain/delivery/enterprise/entities/value-object/order-with-details';
export declare class OrderWithDetailsPresenter {
    static toHTTP(orderWithDetails: OrderWithDetails): {
        address: {
            addressId: string;
            city: string;
            neighborhood: string;
            number: string;
            state: string;
            street: string;
            zip: string;
        };
        order: {
            orderId: string;
            createdAt: Date;
            status: import("../../../core/constants/order-status.enum").ORDER_STATUS;
            deliveryAt: Date;
            withdrawnAt: Date;
        };
        recipient: {
            recipientId: string;
            name: string;
        };
    };
}
