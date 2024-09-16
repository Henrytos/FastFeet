import { DeliveryAddressRepository } from "@/domain/delivery/aplication/repositories/delivery-address-repository";
import { DeliveryAddress } from "@/domain/delivery/enterprise/entites/delivery-address";

export class InMemoryDeliveryAddressRepository
  implements DeliveryAddressRepository
{
  public items: DeliveryAddress[] = [];
  async findById(id: string): Promise<DeliveryAddress | null> {
    const deliveryAddress = this.items.find((item) => {
      return item.id.toString() === id;
    });

    if (!deliveryAddress) {
      return null;
    }

    return deliveryAddress;
  }

  async delete(id: string): Promise<void> {
    const index = this.items.findIndex((item) => item.id.toString() === id);

    if (index == -1) {
      throw new Error("Delivery address not found");
    }

    this.items.splice(index, 1);
  }

  async create(deliveryAddress: DeliveryAddress): Promise<void> {
    this.items.push(deliveryAddress);
  }
}
