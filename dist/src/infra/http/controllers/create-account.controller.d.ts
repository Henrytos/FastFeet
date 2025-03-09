import { AdministratorRegistrationUseCase } from '@/domain/delivery/application/use-cases/administrator-registration-use-case';
import { z } from 'zod';
import { RegisterDeliveryManUseCase } from '@/domain/delivery/application/use-cases/register-delivery-man-use-case';
import { UserPayload } from '@/infra/auth/jwt.strategy';
declare const createUserBodySchema: z.ZodObject<{
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
type CreateUserBodySchema = z.infer<typeof createUserBodySchema>;
export declare class CreateAccountController {
    private readonly administratorRegistrationUseCase;
    private readonly registerDeliveryManUseCase;
    constructor(administratorRegistrationUseCase: AdministratorRegistrationUseCase, registerDeliveryManUseCase: RegisterDeliveryManUseCase);
    handlerCreateAdmin(body: CreateUserBodySchema): Promise<{
        message: string;
    }>;
    handlerCreateUser(body: CreateUserBodySchema, currentUser: UserPayload): Promise<{
        message: string;
    }>;
}
export {};
