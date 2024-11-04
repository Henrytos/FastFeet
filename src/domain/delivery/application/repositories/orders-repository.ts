import { Coordinate } from "@/test/utils/get-distance-between-coordinate";
import { Order } from "@/domain/delivery/enterprise/entities/order";

export abstract class OrdersRepository {
  abstract create(order: Order): Promise<void>;
  abstract findById(id: string): Promise<Order | null>;
  abstract findByRecipientId(id: string): Promise<Order | null>;
  abstract findManyOrdersByRecipientId(
    recipientId: string,
    page: number
  ): Promise<Order[]>;
  abstract fetchManyNearby(
    coordinate: Coordinate,
    page: number
  ): Promise<Order[]>;
  abstract deleteManyByRecipientId(recipientId: string): Promise<void>;
  abstract save(order: Order): Promise<void>;
  abstract delete(order: Order): Promise<void>;
}
