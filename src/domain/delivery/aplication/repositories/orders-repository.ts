import { Coordinate } from "@/test/utils/get-distance-between-coordinate";
import { Order } from "../../enterprise/entites/order";

export interface OrdersRepository {
  create(order: Order): Promise<void>;
  findById(id: string): Promise<Order | null>;
  findByRecipientId(id: string): Promise<Order | null>;
  findManyOrdersByRecipientId(
    recipientId: string,
    page: number
  ): Promise<Order[]>;
  findManyNearby(coordinate: Coordinate): Promise<Order[]>;
  deleteManyByRecipientId(recipientId: string): Promise<void>;
  save(order: Order): Promise<void>;
  delete(order: Order): Promise<void>;
}
