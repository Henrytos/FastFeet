import { Order } from '@/domain/delivery/enterprise/entities/order';
export declare class OrderPresenter {
    static toHTTP(order: Order): {
        id: string;
        deliveryManId: string;
        recipientId: string;
        deliveryAddressId: string;
        photoId: string;
        status: import("../../../core/constants/order-status.enum").ORDER_STATUS;
        deliveryAt: Date;
        withdrawnAt: Date;
        updatedAt: Date;
        createdAt: Date;
    };
}
