import { OrderWithDistance } from '@/domain/delivery/enterprise/entities/value-object/order-with-distance';
export declare class OrderWithDistancePresenter {
    static toHTTP(orderWithDistance: OrderWithDistance): {
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
        distanceInKms: number;
    };
}
