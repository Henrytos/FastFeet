import { DeliveryMan } from "../../enterprise/entites/delivery-man";

export interface DeliveryMansRepository {
  create(deliveryMan: DeliveryMan): Promise<void>;
  findById(id: string): Promise<DeliveryMan | null>;
  delete(deliveryMan: DeliveryMan): Promise<void>;
}
