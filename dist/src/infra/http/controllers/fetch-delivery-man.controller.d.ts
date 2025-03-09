import { FetchDeliveryMansUseCase } from '@/domain/delivery/application/use-cases/fetch-delivery-man-use-case';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { z } from 'zod';
declare const queryParamsSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    perPage: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    page?: number;
    perPage?: number;
}, {
    page?: number;
    perPage?: number;
}>;
type QueryParams = z.infer<typeof queryParamsSchema>;
export declare class FetchDeliveryManController {
    private readonly fetchDeliveryMansUseCase;
    constructor(fetchDeliveryMansUseCase: FetchDeliveryMansUseCase);
    handler({ sub }: UserPayload, { page, perPage }: QueryParams): Promise<{
        user: {
            id: string;
            name: string;
            cpf: string;
            role: string;
        }[];
    }>;
}
export {};
