import { FetchRecentOrderUseCase } from '@/domain/delivery/application/use-cases/fetch-recent-order-use-case';
import { z } from 'zod';
import { UserPayload } from '@/infra/auth/jwt.strategy';
declare const queryParamsFetchRecentOrdersSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    perPage: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    page?: number;
    perPage?: number;
}, {
    page?: number;
    perPage?: number;
}>;
type QueryParamsFetchRecentOrders = z.infer<typeof queryParamsFetchRecentOrdersSchema>;
export declare class FetchRecentOrderController {
    private readonly fetchRecentOrderUseCase;
    constructor(fetchRecentOrderUseCase: FetchRecentOrderUseCase);
    handler({ page, perPage }: QueryParamsFetchRecentOrders, administrator: UserPayload): Promise<{
        orders: {
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
