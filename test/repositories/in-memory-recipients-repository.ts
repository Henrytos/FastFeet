import { DeliveryAddressRepository } from '@/domain/delivery/application/repositories/delivery-address-repository'
import { OrdersRepository } from '@/domain/delivery/application/repositories/orders-repository'
import { RecipientsRepository } from '@/domain/delivery/application/repositories/recipients-repository'
import { Recipient } from '@/domain/delivery/enterprise/entities/recipient'

export class InMemoryRecipientsRepository implements RecipientsRepository {
  public items: Recipient[] = []

  constructor(
    private readonly ordersRepository: OrdersRepository,
    private deliveryAddress: DeliveryAddressRepository,
  ) {}

  async findById(id: string): Promise<Recipient | null> {
    const recipient = this.items.find(
      (recipient) => recipient.id.toString() === id,
    )

    if (!recipient) {
      return null
    }

    return recipient
  }

  async create(recipient: Recipient): Promise<void> {
    this.items.push(recipient)
  }

  async findByEmail(email: string): Promise<Recipient | null> {
    const recipient = this.items.find((recipient) => recipient.email === email)

    if (!recipient) {
      return null
    }

    return recipient
  }

  async delete(recipient: Recipient): Promise<void> {
    const index = this.items.indexOf(recipient)

    if (index === -1) {
      throw new Error('Recipient not found')
    }

    this.items.splice(index, 1)

    const order = await this.ordersRepository.findByRecipientId(
      recipient.id.toString(),
    )

    if (order?.deliveryAddressId) {
      await this.deliveryAddress.delete(order.deliveryAddressId.toString())
    }

    await this.ordersRepository.deleteManyByRecipientId(recipient.id.toString())
  }

  async save(recipient: Recipient): Promise<void> {
    const index = this.items.indexOf(recipient)

    if (index === -1) {
      throw new Error('Recipient not found')
    }

    this.items[index] = recipient
  }

  async fetchRecipients(page: number, perPage: number): Promise<Recipient[]> {
    const recipients = this.items.slice((page - 1) * perPage, page * perPage)

    return recipients
  }
}
