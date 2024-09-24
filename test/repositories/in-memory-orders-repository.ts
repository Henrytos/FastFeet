import { DomainEvents } from "@/core/events/domain-events";
import { OrdersRepository } from "@/domain/delivery/aplication/repositories/orders-repository";
import { Order } from "@/domain/delivery/enterprise/entites/order";
import {
  Coordinate,
  getDistanceBetweenCoordinates,
} from "../utils/get-distance-between-coordinate";
import { DeliveryAddressRepository } from "@/domain/delivery/aplication/repositories/delivery-address-repository";
import { Console } from "console";
export class InMemoryOrdersRepository implements OrdersRepository {
  public items: Order[] = [];

  constructor(private deliveryAddressRepository: DeliveryAddressRepository) {}

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

  async findManyOrdersByRecipientId(
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
  async findManyNearby({ latitude, longitude }: Coordinate): Promise<Order[]> {
    const ordersWithAddress = this.items.filter((item) => {
      if (item.deliveryAddressId == undefined) {
        return false;
      }

      if (item.deliveryAddressId.toString() == "undefined") {
        return false;
      }

      return true;
    });

    const orders = ordersWithAddress.filter(async (item) => {
      if (item.deliveryAddressId == undefined) {
        return false;
      }
      if (item.deliveryAddressId.toString() == "") {
        return false;
      }

      const deliveryAddress = await this.deliveryAddressRepository.findById(
        item.deliveryAddressId.toString()
      );

      if (!deliveryAddress) {
        return false;
      }
      const distance = getDistanceBetweenCoordinates(
        { latitude, longitude },
        {
          latitude: deliveryAddress.latitude,
          longitude: deliveryAddress.longitude,
        }
      );
      return distance < 0.1; // 10km
    });

    return orders;
  }
}
