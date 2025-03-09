import { GetDeliveryManByIdUseCase } from '@/domain/delivery/application/use-cases/get-delivery-man-by-id-use-case';
import { z } from 'zod';
declare const routeParamsGetDeliveryManSchema: z.ZodObject<{
    deliveryManId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    deliveryManId?: string;
}, {
    deliveryManId?: string;
}>;
type RouteParamsGetDeliveryMan = z.infer<typeof routeParamsGetDeliveryManSchema>;
export declare class GetDeliveryManByIdController {
    private readonly getDeliveryManByIdUseCase;
    constructor(getDeliveryManByIdUseCase: GetDeliveryManByIdUseCase);
    handler({ deliveryManId }: RouteParamsGetDeliveryMan): Promise<{
        user: {
            id: string;
            name: string;
            cpf: string;
            role: string;
        };
    }>;
}
export {};
