import { UpdateOrderUseCase } from '@/domain/delivery/application/use-cases/update-order-use-case';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { z } from 'zod';
import { UpdateDeliveryAddressUseCase } from '@/domain/delivery/application/use-cases/update-delivery-address-use-case';
declare const routeParamsUpdateOrderSchema: z.ZodObject<{
    orderId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    orderId?: string;
}, {
    orderId?: string;
}>;
type RouteParamUpdateOrder = z.infer<typeof routeParamsUpdateOrderSchema>;
declare const bodyUpdateOrderSchema: z.ZodObject<{
    status: z.ZodEnum<["PENDING", "DELIVERED", "WITHDRAWN"]>;
    deliveryManId: z.ZodString;
    deliveryAt: z.ZodEffects<z.ZodString, Date, string>;
    withdrawnAt: z.ZodEffects<z.ZodString, Date, string>;
    address: z.ZodObject<{
        state: z.ZodString;
        city: z.ZodString;
        neighborhood: z.ZodString;
        street: z.ZodString;
        zip: z.ZodString;
        number: z.ZodString;
        latitude: z.ZodNumber;
        longitude: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        number?: string;
        state?: string;
        city?: string;
        neighborhood?: string;
        street?: string;
        zip?: string;
        latitude?: number;
        longitude?: number;
    }, {
        number?: string;
        state?: string;
        city?: string;
        neighborhood?: string;
        street?: string;
        zip?: string;
        latitude?: number;
        longitude?: number;
    }>;
}, "strip", z.ZodTypeAny, {
    deliveryManId?: string;
    status?: "PENDING" | "DELIVERED" | "WITHDRAWN";
    deliveryAt?: Date;
    withdrawnAt?: Date;
    address?: {
        number?: string;
        state?: string;
        city?: string;
        neighborhood?: string;
        street?: string;
        zip?: string;
        latitude?: number;
        longitude?: number;
    };
}, {
    deliveryManId?: string;
    status?: "PENDING" | "DELIVERED" | "WITHDRAWN";
    deliveryAt?: string;
    withdrawnAt?: string;
    address?: {
        number?: string;
        state?: string;
        city?: string;
        neighborhood?: string;
        street?: string;
        zip?: string;
        latitude?: number;
        longitude?: number;
    };
}>;
type BodyUpdateOrder = z.infer<typeof bodyUpdateOrderSchema>;
export declare class UpdateOrderCOntroller {
    private readonly updateOrderUseCase;
    private readonly updateDeliveryAddressUseCase;
    constructor(updateOrderUseCase: UpdateOrderUseCase, updateDeliveryAddressUseCase: UpdateDeliveryAddressUseCase);
    handler({ orderId }: RouteParamUpdateOrder, { status, deliveryManId, deliveryAt, withdrawnAt, address, }: BodyUpdateOrder, administrator: UserPayload): Promise<{
        message: string;
    }>;
}
export {};
