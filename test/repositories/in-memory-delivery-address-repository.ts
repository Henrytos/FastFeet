import { DeliveryAddressRepository } from '@/domain/delivery/application/repositories/delivery-address-repository'
import { DeliveryAddressDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/delivery-address-does-not-exist-error'
import { DeliveryAddress } from '@/domain/delivery/enterprise/entities/delivery-address'

export class InMemoryDeliveryAddressRepository
  implements DeliveryAddressRepository
{
  public items: DeliveryAddress[] = []
  async findById(id: string): Promise<DeliveryAddress | null> {
    const deliveryAddress = this.items.find((item) => {
      return item.id.toString() === id
    })

    if (!deliveryAddress) {
      return null
    }

    return deliveryAddress
  }

  async delete(id: string): Promise<void> {
    const index = this.items.findIndex((item) => item.id.toString() === id)

    if (index === -1) {
      throw new DeliveryAddressDoesNotExistError()
    }

    this.items.splice(index, 1)
  }

  async create(deliveryAddress: DeliveryAddress): Promise<void> {
    this.items.push(deliveryAddress)
  }

  async save(deliveryAddress: DeliveryAddress): Promise<void> {
    const index = this.items.findIndex((item) => {
      return item.id.toValue() === deliveryAddress.id.toValue()
    })

    if (index === -1) {
      throw new DeliveryAddressDoesNotExistError()
    }

    this.items[index] = deliveryAddress
  }

  async exists(id: string): Promise<boolean> {
    const deliveryAddressDoesExists: boolean = this.items.some(
      (item) => item.id.toString() === id,
    )

    return deliveryAddressDoesExists
  }
}
