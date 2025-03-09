import { z } from 'zod';
import { UpdateRecipientUseCase } from '@/domain/delivery/application/use-cases/update-recipient-use-case';
import { UserPayload } from '@/infra/auth/jwt.strategy';
declare const updateRecipientBodySchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name?: string;
    email?: string;
}, {
    name?: string;
    email?: string;
}>;
type UpdateRecipientBody = z.infer<typeof updateRecipientBodySchema>;
declare const updateRecipientParams: z.ZodObject<{
    recipientId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    recipientId?: string;
}, {
    recipientId?: string;
}>;
type UpdateRecipientParams = z.infer<typeof updateRecipientParams>;
export declare class UpdateRecipientController {
    private updateRecipientUseCase;
    constructor(updateRecipientUseCase: UpdateRecipientUseCase);
    handler(recipient: UpdateRecipientBody, { recipientId }: UpdateRecipientParams, administrator: UserPayload): Promise<{
        message: string;
    }>;
}
export {};
