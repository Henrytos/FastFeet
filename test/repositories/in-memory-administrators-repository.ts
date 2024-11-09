import { AdministratorsRepository } from '@/domain/delivery/application/repositories/administrators-repository'
import { Administrator } from '@/domain/delivery/enterprise/entities/administrator'
import { Cpf } from '@/domain/delivery/enterprise/entities/value-object/cpf'

export class InMemoryAdministratorsRepository
  implements AdministratorsRepository
{
  public items: Administrator[] = []

  async create(administrator: Administrator): Promise<void> {
    this.items.push(administrator)
  }

  async findByCpf(cpf: Cpf): Promise<Administrator | null> {
    const administrator = this.items.find(
      (item) => item.cpf.value === cpf.value,
    )

    if (!administrator) {
      return null
    }

    return administrator
  }

  async findById(id: string): Promise<Administrator | null> {
    const deliveryMan = this.items.find((item) => item.id.toString() === id)

    if (!deliveryMan) {
      return null
    }

    return deliveryMan
  }
}
