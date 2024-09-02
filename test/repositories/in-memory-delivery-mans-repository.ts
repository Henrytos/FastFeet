import { DeliveryMansRepository } from "@/domain/delivery/aplication/repositories/delivery-mans-repository";
import { DeliveryMan } from "@/domain/delivery/enterprise/entites/delivery-man";

export class InMemoryDeliveryMansRepository implements DeliveryMansRepository {
  public items: DeliveryMan[] = [];

  async create(deliveryMan: DeliveryMan): Promise<void> {
    this.items.push(deliveryMan);
  }
}
