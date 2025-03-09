import { RegisterDeliveryManUseCase } from '@/domain/delivery/application/use-cases/register-delivery-man-use-case';
import { z } from 'zod';
import { UserPayload } from '@/infra/auth/jwt.strategy';
declare const registerDeliveryManBodySchema: z.ZodObject<{
    name: z.ZodString;
    cpf: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name?: string;
    cpf?: string;
    password?: string;
}, {
    name?: string;
    cpf?: string;
    password?: string;
}>;
type RegisterDeliveryManBody = z.infer<typeof registerDeliveryManBodySchema>;
export declare class RegisterDeliveryManController {
    private readonly registerDeliveryManUseCase;
    constructor(registerDeliveryManUseCase: RegisterDeliveryManUseCase);
    handler(administrator: UserPayload, body: RegisterDeliveryManBody): Promise<void>;
}
export {};
