import { DeleteRecipientUseCase } from '@/domain/delivery/application/use-cases/delete-recipient-use-case';
import { z } from 'zod';
import { UserPayload } from '@/infra/auth/jwt.strategy';
declare const paramsDeleteRecipientSchema: z.ZodObject<{
    recipientId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    recipientId?: string;
}, {
    recipientId?: string;
}>;
type ParamsDeleteRecipient = z.infer<typeof paramsDeleteRecipientSchema>;
export declare class DeleteRecipientController {
    private deleteRecipientUseCase;
    constructor(deleteRecipientUseCase: DeleteRecipientUseCase);
    handler({ recipientId }: ParamsDeleteRecipient, administrator: UserPayload): Promise<void>;
}
export {};
