import { DeleteDeliveryManByIdUseCase } from '@/domain/delivery/application/use-cases/delete-delivery-man-by-id-use-case';
import { UserPayload } from '@/infra/auth/jwt.strategy';
export declare class DeleteDeliveryManController {
    private readonly deleteDeliveryManUseCase;
    constructor(deleteDeliveryManUseCase: DeleteDeliveryManByIdUseCase);
    handler(user: UserPayload, deliveryManId: string): Promise<void>;
}
