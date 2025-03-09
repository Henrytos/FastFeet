import { Recipient } from '@/domain/delivery/enterprise/entities/recipient';
export declare class RecipientPresenter {
    static toHTTP(recipient: Recipient): {
        id: string;
        name: string;
        email: string;
    };
}
