import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Notification,
  NotificationProps,
} from '@/domain/notification/enterprise/entities/notification'
import { PrismaNotificationMapper } from '@/infra/database/prisma/mappers/prisma-notification-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { randomUUID } from 'crypto'

export function makeNotification(
  overwide?: Partial<NotificationProps>,
  id?: UniqueEntityID,
) {
  const notification = Notification.create(
    {
      content: faker.lorem.sentence(),
      recipientId: new UniqueEntityID(randomUUID()),
      title: faker.lorem.sentence(),
      ...overwide,
    },
    id,
  )

  return notification
}

@Injectable()
export class NotificationFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaNotification(overwide: Partial<NotificationProps> = {}) {
    const notification = makeNotification(overwide)

    const prismaNotification = await this.prisma.notification.create({
      data: PrismaNotificationMapper.toPrisma(notification),
    })

    return prismaNotification
  }
}
