import { FetchRecipientUseCase } from '@/domain/delivery/application/use-cases/fetch-recipient-use-case';
import { z } from 'zod';
import { UserPayload } from '@/infra/auth/jwt.strategy';
declare const queryParamsFetchRecipientSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    perPage: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    page?: number;
    perPage?: number;
}, {
    page?: number;
    perPage?: number;
}>;
type QueryParamsFetchRecipient = z.infer<typeof queryParamsFetchRecipientSchema>;
export declare class FetchRecipientController {
    private fetchRecipientUseCase;
    constructor(fetchRecipientUseCase: FetchRecipientUseCase);
    handler({ page, perPage }: QueryParamsFetchRecipient, administrator: UserPayload): Promise<{
        recipients: {
            id: string;
            name: string;
            email: string;
        }[];
    }>;
}
export {};
