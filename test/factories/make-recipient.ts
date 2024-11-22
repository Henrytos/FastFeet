import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Recipient,
  RecipientProps,
} from '@/domain/delivery/enterprise/entities/recipient'
import { PrismaRecipientMapper } from '@/infra/database/prisma/mappers/prisma-recipient-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

export function makeRecipient(
  overwide: Partial<RecipientProps> = {},
  id?: UniqueEntityID,
) {
  const recipient = Recipient.create(
    {
      email: faker.internet.email(),
      name: faker.person.firstName(),
      ...overwide,
    },
    id,
  )
  return recipient
}

@Injectable()
export class RecipientFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaRecipient(overwide: Partial<RecipientProps> = {}) {
    const recipient = makeRecipient(overwide)

    const recipientPrisma = await this.prisma.recipient.create({
      data: PrismaRecipientMapper.toPrisma(recipient),
    })

    return recipientPrisma
  }
}
