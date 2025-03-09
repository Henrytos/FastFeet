import { UserPayload } from '@/infra/auth/jwt.strategy';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
export declare class GetProfileController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    handler({ sub }: UserPayload): Promise<{
        user: {
            id: string;
            name: string;
            cpf: string;
            role: import(".prisma/client").$Enums.Role;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
