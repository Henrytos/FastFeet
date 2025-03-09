import { OrdersRepository } from '@/domain/delivery/application/repositories/orders-repository';
import { Order } from '@/domain/delivery/enterprise/entities/order';
import { Coordinate } from '@/test/utils/get-distance-between-coordinate';
import { PrismaService } from '../prisma.service';
import { OrderWithDetails } from '@/domain/delivery/enterprise/entities/value-object/order-with-details';
import { OrderWithDistance } from '@/domain/delivery/enterprise/entities/value-object/order-with-distance';
export declare class PrismaOrdersRepository implements OrdersRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(order: Order): Promise<void>;
    findByIdWithDetails(id: string): Promise<OrderWithDetails | null>;
    findById(id: string): Promise<Order | null>;
    findByRecipientId(recipientId: string): Promise<Order | null>;
    fetchOrdersByRecipientId(recipientId: string, page: number): Promise<Order[]>;
    fetchOrderByDeliveryManId({ deliveryManId, page, perPage, }: {
        deliveryManId: string;
        page: number;
        perPage: number;
    }): Promise<Order[]>;
    fetchManyNearby(coordinate: Coordinate): Promise<Order[]>;
    fetchManyNearbyWithDistance(coordinate: Coordinate): Promise<OrderWithDistance[]>;
    deleteManyByRecipientId(recipientId: string): Promise<void>;
    save(order: Order): Promise<void>;
    delete(order: Order): Promise<void>;
    fetchRecentOrder({ page, perPage, }: {
        page: number;
        perPage: number;
    }): Promise<Order[]>;
    exists(id: string): Promise<boolean>;
}
