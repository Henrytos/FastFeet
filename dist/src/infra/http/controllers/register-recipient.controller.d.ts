import { z } from 'zod';
import { RegisterRecipientUseCase } from '@/domain/delivery/application/use-cases/register-recipient-use-case';
import { UserPayload } from '@/infra/auth/jwt.strategy';
declare const registerRecipientBodySchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name?: string;
    email?: string;
}, {
    name?: string;
    email?: string;
}>;
type RegisterRecipientBody = z.infer<typeof registerRecipientBodySchema>;
export declare class RegisterRecipientController {
    private registerRecipientUseCase;
    constructor(registerRecipientUseCase: RegisterRecipientUseCase);
    handler(recipient: RegisterRecipientBody, administrator: UserPayload): Promise<{}>;
}
export {};
