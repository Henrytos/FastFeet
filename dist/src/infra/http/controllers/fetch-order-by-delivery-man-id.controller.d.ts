import { z } from 'zod';
import { FetchOrderByDeliveryManIdUseCase } from '@/domain/delivery/application/use-cases/fetch-order-by-delivery-man-id-use-case';
declare const queryParamsSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    perPage: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    page?: number;
    perPage?: number;
}, {
    page?: number;
    perPage?: number;
}>;
type QueryParams = z.infer<typeof queryParamsSchema>;
declare const routeParamsSchema: z.ZodObject<{
    deliveryManId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    deliveryManId?: string;
}, {
    deliveryManId?: string;
}>;
type RouteParams = z.infer<typeof routeParamsSchema>;
export declare class FetchOrderByDeliveryManIdController {
    private readonly fetchOrderByDeliveryManIdUseCase;
    constructor(fetchOrderByDeliveryManIdUseCase: FetchOrderByDeliveryManIdUseCase);
    handler({ page, perPage }: QueryParams, { deliveryManId }: RouteParams): Promise<{
        user: {
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
        }[];
    }>;
}
export {};
