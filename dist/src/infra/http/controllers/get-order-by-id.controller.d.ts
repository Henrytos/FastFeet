import { GetOrderByIdUseCase } from '@/domain/delivery/application/use-cases/get-order-by-id-use-case';
import { z } from 'zod';
declare const routeParamsGetOrderSchema: z.ZodObject<{
    orderId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    orderId?: string;
}, {
    orderId?: string;
}>;
type RouteParamsGetOrder = z.infer<typeof routeParamsGetOrderSchema>;
export declare class GetORderByIdController {
    private readonly getOrderByIdUseCase;
    constructor(getOrderByIdUseCase: GetOrderByIdUseCase);
    handler({ orderId }: RouteParamsGetOrder): Promise<{
        orderWithDetails: {
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
    }>;
}
export {};
