import { UpdateDeliveryManByAdministratorUseCase } from '@/domain/delivery/application/use-cases/update-delivery-man-by-administrator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { z } from 'zod';
declare const updateDeliveryManBodySchema: z.ZodObject<{
    name: z.ZodString;
    password: z.ZodString;
    cpf: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name?: string;
    password?: string;
    cpf?: string;
}, {
    name?: string;
    password?: string;
    cpf?: string;
}>;
type UpdateDeliveryManBodySchema = z.infer<typeof updateDeliveryManBodySchema>;
export declare class UpdateDeliveryManController {
    private readonly updateDeliveryManByAdministratorUseCase;
    constructor(updateDeliveryManByAdministratorUseCase: UpdateDeliveryManByAdministratorUseCase);
    handler(user: UserPayload, deliveryManId: string, body: UpdateDeliveryManBodySchema): Promise<{
        message: string;
    }>;
}
export {};
