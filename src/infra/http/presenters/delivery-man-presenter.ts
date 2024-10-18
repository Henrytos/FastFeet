import { DeliveryMan } from '@/domain/delivery/enterprise/entities/delivery-man';

export class DeliveryManPresenter {
  static toHTTP(deliveryMan: DeliveryMan) {
    return {
      name: deliveryMan.name,
      cpf: deliveryMan.cpf.value,
      role: 'DELIVERY_MAN',
    };
  }
}
