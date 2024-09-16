import { DeliveryAddress } from "../../enterprise/entites/delivery-address";

export interface DeliveryAddressRepository {
  findById(id: string): Promise<DeliveryAddress | null>;
  delete(id: string): Promise<void>;
  create(deliveryAddress: DeliveryAddress): Promise<void>;
}
