import { OrdersRepository } from "@/domain/delivery/aplication/repositories/orders-repository";
import { Order } from "@/domain/delivery/enterprise/entites/order";
export class InMemoryOrdersRepository implements OrdersRepository {
  public items: Order[] = [];

  async create(order: Order): Promise<void> {
    this.items.push(order);
  }
}
