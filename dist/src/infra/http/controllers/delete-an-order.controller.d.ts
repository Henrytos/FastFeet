import { DeleteAnOrderUseCase } from '@/domain/delivery/application/use-cases/delete-an-order-use-case';
import { z } from 'zod';
import { UserPayload } from '@/infra/auth/jwt.strategy';
declare const routeParamsDeleteAnOrderSchema: z.ZodObject<{
    orderId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    orderId?: string;
}, {
    orderId?: string;
}>;
type RouteParamsDeleteAnOrder = z.infer<typeof routeParamsDeleteAnOrderSchema>;
export declare class DeleteAnOrderController {
    private readonly deleteAnOrderUseCase;
    constructor(deleteAnOrderUseCase: DeleteAnOrderUseCase);
    handler({ orderId }: RouteParamsDeleteAnOrder, administrator: UserPayload): Promise<void>;
}
export {};
