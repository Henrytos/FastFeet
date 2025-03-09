import { ChangeDeliveryManPasswordUseCase } from '@/domain/delivery/application/use-cases/change-delivery-man-password-use-case';
import { z } from 'zod';
import { UserPayload } from '@/infra/auth/jwt.strategy';
declare const validationPasswordSchema: z.ZodString;
type ValidationPasswordSchema = z.infer<typeof validationPasswordSchema>;
export declare class ChangeDeliveryManPasswordController {
    private readonly changeDeliveryManPasswordUseCase;
    constructor(changeDeliveryManPasswordUseCase: ChangeDeliveryManPasswordUseCase);
    handler(user: UserPayload, deliveryManCpf: string, password: ValidationPasswordSchema): Promise<{
        message: string;
    }>;
}
export {};
