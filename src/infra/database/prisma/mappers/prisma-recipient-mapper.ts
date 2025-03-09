import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Recipient } from '@/domain/delivery/enterprise/entities/recipient'
import { Prisma, Recipient as PrismaRecipient } from '@prisma/client'

export class PrismaRecipientMapper {
  static toDomain(raw: PrismaRecipient): Recipient {
    return Recipient.create(
      {
        email: raw.email,
        name: raw.name,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(recipient: Recipient): Prisma.RecipientUncheckedCreateInput {
    return {
      id: recipient.id.toString(),
      email: recipient.email,
      name: recipient.name,
    }
  }
}
