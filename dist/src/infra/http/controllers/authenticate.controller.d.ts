import { z } from 'zod';
import { AuthenticateUserUseCase } from '@/domain/delivery/application/use-cases/authenticate-user-use-case';
declare const authenticateBodySchema: z.ZodObject<{
    cpf: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    password?: string;
    cpf?: string;
}, {
    password?: string;
    cpf?: string;
}>;
type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>;
export declare class AuthenticateController {
    private readonly authenticateUserUseCase;
    constructor(authenticateUserUseCase: AuthenticateUserUseCase);
    handler(body: AuthenticateBodySchema): Promise<{
        accessToken: string;
    }>;
}
export {};
