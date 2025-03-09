import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DeliveryMan } from '@/domain/delivery/enterprise/entities/delivery-man'
import { Cpf } from '@/domain/delivery/enterprise/entities/value-object/cpf'
import { Prisma, User as PrismaDeliveryMan } from '@prisma/client'

export class PrismaDeliveryManMapper {
  static toDomain(raw: PrismaDeliveryMan): DeliveryMan {
    return DeliveryMan.create(
      {
        cpf: Cpf.create(raw.cpf),
        name: raw.name,
        password: raw.passwordHash,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(deliveryMan: DeliveryMan): Prisma.UserUncheckedCreateInput {
    return {
      id: deliveryMan.id.toString(),
      cpf: deliveryMan.cpf.value,
      name: deliveryMan.name,
      passwordHash: deliveryMan.password,
      role: 'DELIVERY_MAN',
    }
  }
}
