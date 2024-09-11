import { Order } from "../../enterprise/entites/order";

export interface OrdersRepository {
  create(order: Order): Promise<void>;
  findById(id: string): Promise<Order | null>;
  fetchOrdersByRecipientId(recipientId: string, page: number): Promise<Order[]>;
  save(order: Order): Promise<void>;
  delete(order: Order): Promise<void>;
}
