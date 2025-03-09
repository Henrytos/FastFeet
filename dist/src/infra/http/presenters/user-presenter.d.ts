import { User } from '@prisma/client';
export declare class UserPresenter {
    static toHTTP(user: User): {
        id: string;
        name: string;
        cpf: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    };
}
