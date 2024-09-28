import { DeliveryMan } from '../../enterprise/entities/delivery-man';
import { Cpf } from '../../enterprise/entities/value-object/cpf';

export interface DeliveryMansRepository {
  create(deliveryMan: DeliveryMan): Promise<void>;
  findById(id: string): Promise<DeliveryMan | null>;
  findByCpf(cpf: Cpf): Promise<DeliveryMan | null>;
  save(deliveryMan: DeliveryMan): Promise<void>;
  delete(deliveryMan: DeliveryMan): Promise<void>;
}
