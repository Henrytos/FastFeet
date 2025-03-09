import { RecipientsRepository } from '@/domain/delivery/application/repositories/recipients-repository';
import { Recipient } from '@/domain/delivery/enterprise/entities/recipient';
import { PrismaService } from '../prisma.service';
import { OrdersRepository } from '@/domain/delivery/application/repositories/orders-repository';
export declare class PrismaRecipientsRepository implements RecipientsRepository {
    private readonly prisma;
    private readonly ordersRepository;
    constructor(prisma: PrismaService, ordersRepository: OrdersRepository);
    findById(id: string): Promise<Recipient | null>;
    create(recipient: Recipient): Promise<void>;
    findByEmail(email: string): Promise<Recipient | null>;
    delete(recipient: Recipient): Promise<void>;
    save(recipient: Recipient): Promise<void>;
    fetchRecipients(page: number, perPage: number): Promise<Recipient[]>;
    exists(id: string): Promise<boolean>;
}
