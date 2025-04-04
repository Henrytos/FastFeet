import { RecipientsRepository } from '@/domain/delivery/application/repositories/recipients-repository'
import { Recipient } from '@/domain/delivery/enterprise/entities/recipient'
import { PrismaService } from '../prisma.service'
import { PrismaRecipientMapper } from '../mappers/prisma-recipient-mapper'
import { OrdersRepository } from '@/domain/delivery/application/repositories/orders-repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaRecipientsRepository implements RecipientsRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ordersRepository: OrdersRepository,
  ) {}

  async findById(id: string): Promise<Recipient | null> {
    const recipient = await this.prisma.recipient.findFirst({
      where: {
        id,
      },
    })

    if (!recipient) {
      return null
    }

    return PrismaRecipientMapper.toDomain(recipient)
  }

  async create(recipient: Recipient): Promise<void> {
    const data = PrismaRecipientMapper.toPrisma(recipient)
    await this.prisma.recipient.create({ data })
  }

  async findByEmail(email: string): Promise<Recipient | null> {
    const recipient = await this.prisma.recipient.findFirst({
      where: {
        email,
      },
    })

    if (!recipient) {
      return null
    }

    return PrismaRecipientMapper.toDomain(recipient)
  }

  async delete(recipient: Recipient): Promise<void> {
    const recipientAlreadyExists = this.findByEmail(recipient.email)

    if (!recipientAlreadyExists) {
      throw new Error('Recipient not found')
    }

    await this.prisma.recipient.delete({
      where: {
        id: recipient.id.toString(),
      },
    })

    await this.ordersRepository.deleteManyByRecipientId(recipient.id.toString())
  }

  async save(recipient: Recipient): Promise<void> {
    const recipientAlreadyExists = this.findById(recipient.id.toString())

    if (!recipientAlreadyExists) {
      throw new Error('Recipient not found')
    }

    const data = PrismaRecipientMapper.toPrisma(recipient)
    await this.prisma.recipient.update({
      where: {
        id: recipient.id.toString(),
      },
      data,
    })
  }

  async fetchRecipients(page: number, perPage: number): Promise<Recipient[]> {
    const recipients = await this.prisma.recipient.findMany({
      skip: (page - 1) * perPage,
      take: perPage,
      orderBy: {
        createdAt: 'desc',
      },
    })

    return recipients.map(PrismaRecipientMapper.toDomain)
  }

  async exists(id: string): Promise<boolean> {
    const recipient = await this.findById(id)
    return !!recipient
  }
}
