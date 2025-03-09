import { GetRecipientUseCase } from '@/domain/delivery/application/use-cases/get-recipient-use-case';
import { z } from 'zod';
import { UserPayload } from '@/infra/auth/jwt.strategy';
declare const getRecipientParamsSchema: z.ZodObject<{
    recipientId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    recipientId?: string;
}, {
    recipientId?: string;
}>;
type GetRecipientParams = z.infer<typeof getRecipientParamsSchema>;
export declare class GetRecipientController {
    private getRecipientUseCase;
    constructor(getRecipientUseCase: GetRecipientUseCase);
    handler({ recipientId }: GetRecipientParams, administrator: UserPayload): Promise<{
        recipient: {
            id: string;
            name: string;
            email: string;
        };
    }>;
}
export {};
