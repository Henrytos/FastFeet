import { OrdersRepository } from "@/domain/delivery/aplication/repositories/orders-repository";
import { Order } from "@/domain/delivery/enterprise/entites/order";
export class InMemoryOrdersRepository implements OrdersRepository {
  public items: Order[] = [];

  async create(order: Order): Promise<void> {
    this.items.push(order);
  }

  async findById(id: string): Promise<Order | null> {
    const order = this.items.find((item) => {
      return item.id.toString() == id;
    });

    if (!order) {
      return null;
    }

    return order;
  }

  async save(order: Order): Promise<void> {
    const index = this.items.findIndex((item) => {
      return item.id.toValue() == order.id.toValue();
    });

    this.items[index] = order;
  }
}
