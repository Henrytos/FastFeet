import { MarkAnOrderAsDeliveredUseCase } from '@/domain/delivery/application/use-cases/mark-an-order-as-delivered-use-case';
import { z } from 'zod';
import { UserPayload } from '@/infra/auth/jwt.strategy';
declare const routeParamsMarkAnOrderSchema: z.ZodObject<{
    orderId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    orderId?: string;
}, {
    orderId?: string;
}>;
type RouteParamsMarkAnOrder = z.infer<typeof routeParamsMarkAnOrderSchema>;
declare const bodyMarkAnOrderSchema: z.ZodObject<{
    photoId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    photoId?: string;
}, {
    photoId?: string;
}>;
type BodyMarkAnOrder = z.infer<typeof bodyMarkAnOrderSchema>;
export declare class MarkAnOrderAsDeliveredController {
    private readonly markAnOrderAsDeliveredUseCase;
    constructor(markAnOrderAsDeliveredUseCase: MarkAnOrderAsDeliveredUseCase);
    handler({ orderId }: RouteParamsMarkAnOrder, { photoId }: BodyMarkAnOrder, { sub: deliveryManId }: UserPayload): Promise<{
        message: string;
    }>;
}
export {};
