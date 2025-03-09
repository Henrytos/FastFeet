import { SendingOrderToRecipientByDeliveryManUseCase } from '@/domain/delivery/application/use-cases/sending-order-to-recipient-by-delivery-person-use-case';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { z } from 'zod';
declare const routeParamsSendingOrderSchema: z.ZodObject<{
    orderId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    orderId?: string;
}, {
    orderId?: string;
}>;
type RouteParamsSendingOrder = z.infer<typeof routeParamsSendingOrderSchema>;
export declare class SendingOrderToRecipientByDeliveryManController {
    private readonly sendingOrderToRecipientByDeliveryManUseCase;
    constructor(sendingOrderToRecipientByDeliveryManUseCase: SendingOrderToRecipientByDeliveryManUseCase);
    handler({ orderId }: RouteParamsSendingOrder, deliveryMan: UserPayload): Promise<{
        message: string;
    }>;
}
export {};
