import { DeliveryAddress } from "../../enterprise/entites/delivery-address";

export interface DeliveryAddressRepository {
  findById(id: string): Promise<DeliveryAddress | null>;
  deleteManyByRecipientId(recipientId: string): Promise<void>;
}
