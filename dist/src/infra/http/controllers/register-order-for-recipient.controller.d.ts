import { RegisterDeliveryAddressUseCase } from '@/domain/delivery/application/use-cases/register-delivery-address-use-case';
import { RegisterOrderForRecipientUseCase } from '@/domain/delivery/application/use-cases/register-order-for-recipient-use-case';
import { z } from 'zod';
import { UserPayload } from '@/infra/auth/jwt.strategy';
declare const paramsRegisterOrderSchema: z.ZodObject<{
    recipientId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    recipientId?: string;
}, {
    recipientId?: string;
}>;
type ParamsRegisterOrder = z.infer<typeof paramsRegisterOrderSchema>;
declare const bodyRegisterOrderSchema: z.ZodObject<{
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
type BodyRegisterOrder = z.infer<typeof bodyRegisterOrderSchema>;
export declare class RegisterOrderForRecipientController {
    private readonly registerOrderUseCase;
    private readonly registerDeliveryAddressUseCase;
    constructor(registerOrderUseCase: RegisterOrderForRecipientUseCase, registerDeliveryAddressUseCase: RegisterDeliveryAddressUseCase);
    handler({ recipientId }: ParamsRegisterOrder, body: BodyRegisterOrder, administrator: UserPayload): Promise<{
        message: string;
    }>;
}
export {};
