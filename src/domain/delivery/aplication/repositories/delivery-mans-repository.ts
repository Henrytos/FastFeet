import { DeliveryMan } from "../../enterprise/entites/delivery-man";

export interface DeliveryMansRepository {
  create(deliveryMan: DeliveryMan): Promise<void>;
}
