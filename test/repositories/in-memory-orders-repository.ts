import { DomainEvents } from "@/core/events/domain-events";
import { OrdersRepository } from "@/domain/delivery/aplication/repositories/orders-repository";
import { Order } from "@/domain/delivery/enterprise/entites/order";
export class InMemoryOrdersRepository implements OrdersRepository {
  public items: Order[] = [];

  async create(order: Order): Promise<void> {
    this.items.push(order);

    switch (order.status) {
      case "pending":
        DomainEvents.dispatchEventsForAggregate(order.id);
        break;
    }
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

    switch (order.status) {
      case "pending":
        DomainEvents.dispatchEventsForAggregate(order.id);
        break;
      case "withdrawn":
        DomainEvents.dispatchEventsForAggregate(order.id);
        break;
      case "delivered":
        DomainEvents.dispatchEventsForAggregate(order.id);
        break;
      case "canceled":
        DomainEvents.dispatchEventsForAggregate(order.id);

        break;
    }
  }

  async delete(order: Order) {
    const orderDoesExists = !this.findById(order.id.toString());
    if (orderDoesExists) {
      throw new Error("Order does not exist");
    }

    const index = this.items.findIndex((item) => {
      return item.id.toValue() == order.id.toValue();
    });

    this.items.splice(index, 1);
  }

  async fetchOrdersByRecipientId(
    recipientId: string,
    page: number
  ): Promise<Order[]> {
    const orders = this.items
      .filter((item) => {
        return item.recipientId.toString() == recipientId;
      })
      .slice((page - 1) * 20, (page - 1) * 20 + 20);

    return orders;
  }

  async deleteManyByRecipientId(recipientId: string): Promise<void> {
    const ordersFiltered = this.items.filter((item) => {
      return item.recipientId.toString() !== recipientId;
    });

    this.items = ordersFiltered;
  }

  async findByRecipientId(recipientId: string): Promise<Order | null> {
    const order = this.items.find((item) => {
      return item.recipientId.toString() === recipientId;
    });

    if (!order) {
      return null;
    }

    return order;
  }
}
