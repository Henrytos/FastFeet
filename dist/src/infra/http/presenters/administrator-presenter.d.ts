import { Administrator } from '@/domain/delivery/enterprise/entities/administrator';
export declare class AdministratorPresenter {
    static toHTTP(administrator: Administrator): {
        id: string;
        name: string;
        cpf: string;
        role: string;
    };
}
