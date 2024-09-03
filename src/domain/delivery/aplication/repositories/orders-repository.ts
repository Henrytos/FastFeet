import { Order } from "../../enterprise/entites/order";

export interface OrdersRepository {
  create(order: Order): Promise<void>;
}
