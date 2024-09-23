import { Order } from "../../enterprise/entites/order";

export interface FromCordinate{
  latitude:number
  logintude:number
}

export interface OrdersRepository {
  create(order: Order): Promise<void>;
  findById(id: string): Promise<Order | null>;
  findByRecipientId(id: string): Promise<Order | null>;
  fetchOrdersByRecipientId(recipientId: string, page: number): Promise<Order[]>;
  findManyNearby(fromCordinate:FromCordinate):Promise<Order[]>
  deleteManyByRecipientId(recipientId: string): Promise<void>;
  save(order: Order): Promise<void>;
  delete(order: Order): Promise<void>;
}
