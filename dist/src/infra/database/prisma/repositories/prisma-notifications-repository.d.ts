import { NotificationsRepository } from '@/domain/notification/application/repositories/notifications-repository';
import { Notification } from '@/domain/notification/enterprise/entities/notification';
import { PrismaService } from '../prisma.service';
export declare class PrismaNotificationsRepository implements NotificationsRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(notification: Notification): Promise<void>;
    findById(id: string): Promise<Notification | null>;
    save(notification: Notification): Promise<void>;
}
