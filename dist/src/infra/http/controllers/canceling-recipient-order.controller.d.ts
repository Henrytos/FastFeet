import { CancelingRecipientOrderUseCase } from '@/domain/delivery/application/use-cases/canceling-recipient-order-use-case';
import { z } from 'zod';
import { UserPayload } from '@/infra/auth/jwt.strategy';
declare const routeParamCancelingOrderSchema: z.ZodObject<{
    orderId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    orderId?: string;
}, {
    orderId?: string;
}>;
type RouteParamCancelingOrder = z.infer<typeof routeParamCancelingOrderSchema>;
export declare class CancelingRecipientOrderController {
    private readonly cancelingRecipientOrderUseCase;
    constructor(cancelingRecipientOrderUseCase: CancelingRecipientOrderUseCase);
    handler({ orderId }: RouteParamCancelingOrder, deliveryMan: UserPayload): Promise<{
        message: string;
    }>;
}
export {};
