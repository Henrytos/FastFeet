import { DeliveryMan } from '@/domain/delivery/enterprise/entities/delivery-man';
export declare class DeliveryManPresenter {
    static toHTTP(deliveryMan: DeliveryMan): {
        id: string;
        name: string;
        cpf: string;
        role: string;
    };
}
