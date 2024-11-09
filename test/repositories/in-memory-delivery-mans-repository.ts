import { DeliveryMansRepository } from '@/domain/delivery/application/repositories/delivery-mans-repository'
import { DeliveryMan } from '@/domain/delivery/enterprise/entities/delivery-man'
import { Cpf } from '@/domain/delivery/enterprise/entities/value-object/cpf'

export class InMemoryDeliveryMansRepository implements DeliveryMansRepository {
  public items: DeliveryMan[] = []

  async findByCpf(cpf: Cpf): Promise<DeliveryMan | null> {
    const deliveryMan = this.items.find((item) => item.cpf.value === cpf.value)

    if (!deliveryMan) {
      return null
    }

    return deliveryMan
  }

  async create(deliveryMan: DeliveryMan): Promise<void> {
    this.items.push(deliveryMan)
  }

  async findById(id: string): Promise<DeliveryMan | null> {
    const deliveryMan = this.items.find((item) => item.id.toString() === id)

    if (!deliveryMan) {
      return null
    }

    return deliveryMan
  }

  async delete(deliveryMan: DeliveryMan): Promise<void> {
    this.items = this.items.filter((item) => item.id !== deliveryMan.id)
  }

  async save(deliveryMan: DeliveryMan): Promise<void> {
    const index = this.items.findIndex((item) => item.id === deliveryMan.id)
    this.items[index] = deliveryMan
  }

  async fetchDeliveryManByPage(
    page: number,
    perPage: number,
  ): Promise<DeliveryMan[]> {
    const deliveryMans = this.items.slice((page - 1) * perPage, page * perPage)

    return deliveryMans
  }
}
