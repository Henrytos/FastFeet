import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Administrator,
  AdministratorProps,
} from '@/domain/delivery/enterprise/entities/administrator'
import { Cpf } from '@/domain/delivery/enterprise/entities/value-object/cpf'
import { PrismaAdministratorMapper } from '@/infra/database/prisma/mappers/prisma-administrator-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

export function makeAdministrator(
  overwide: Partial<AdministratorProps> = {},
  id?: UniqueEntityID,
) {
  const administrator = Administrator.create(
    {
      cpf: Cpf.create(
        faker.number.int({ min: 10000000000, max: 99999999999 }).toString(),
      ),
      name: faker.internet.userName(),
      password: faker.internet.password(),
      ...overwide,
    },
    id,
  )
  return administrator
}

@Injectable()
export class AdministratorFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaAdministrator(overwide: Partial<AdministratorProps> = {}) {
    const administrator = makeAdministrator(overwide)

    const prismaAdministrator = await this.prisma.user.create({
      data: PrismaAdministratorMapper.toPrisma(administrator),
    })

    return prismaAdministrator
  }
}
