import { OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

export class PrismaService
  extends PrismaClient
  implements OnModuleDestroy, OnModuleInit
{
  constructor() {
    super()
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect()
  }

  async onModuleInit(): Promise<void> {
    await this.$connect()
  }
}
