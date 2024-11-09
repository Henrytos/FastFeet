import { DeliveryMan } from '@/domain/delivery/enterprise/entities/delivery-man'
import { Cpf } from '@/domain/delivery/enterprise/entities/value-object/cpf'

export abstract class DeliveryMansRepository {
  abstract create(deliveryMan: DeliveryMan): Promise<void>
  abstract findById(id: string): Promise<DeliveryMan | null>
  abstract findByCpf(cpf: Cpf): Promise<DeliveryMan | null>
  abstract save(deliveryMan: DeliveryMan): Promise<void>
  abstract delete(deliveryMan: DeliveryMan): Promise<void>
  abstract fetchDeliveryManByPage(
    page: number,
    perPage: number,
  ): Promise<DeliveryMan[]>
}
