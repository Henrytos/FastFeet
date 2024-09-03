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
}
