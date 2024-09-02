import { DeliveryMansRepository } from "@/domain/delivery/aplication/repositories/delivery-mans-repository";
import { DeliveryMan } from "@/domain/delivery/enterprise/entites/delivery-man";

export class InMemoryDeliveryMansRepository implements DeliveryMansRepository {
  public items: DeliveryMan[] = [];

  async create(deliveryMan: DeliveryMan): Promise<void> {
    this.items.push(deliveryMan);
  }

  async findById(id: string): Promise<DeliveryMan | null> {
    const deliveryMan = this.items.find((item) => item.id.toString() === id);

    if (!deliveryMan) {
      return null;
    }

    return deliveryMan;
  }

  async delete(deliveryMan: DeliveryMan): Promise<void> {
    this.items = this.items.filter((item) => item.id !== deliveryMan.id);
  }
}
