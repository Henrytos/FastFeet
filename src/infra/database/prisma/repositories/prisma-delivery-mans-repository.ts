import { DeliveryMansRepository } from '@/domain/delivery/application/repositories/delivery-mans-repository'
import { DeliveryMan } from '@/domain/delivery/enterprise/entities/delivery-man'
import { Cpf } from '@/domain/delivery/enterprise/entities/value-object/cpf'
import { Injectable } from '@nestjs/common'
import { PrismaDeliveryManMapper } from '../mappers/prisma-delivery-man-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaDeliveryMansRepository implements DeliveryMansRepository {
  constructor(private prisma: PrismaService) {}

  async fetchDeliveryManByPage(
    page: number,
    perPage: number,
  ): Promise<DeliveryMan[]> {
    const deliveryMans = await this.prisma.user.findMany({
      where: {
        role: 'DELIVERY_MAN',
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: (page - 1) * perPage,
      take: perPage,
    })

    return deliveryMans.map(PrismaDeliveryManMapper.toDomain)
  }

  async create(deliveryMan: DeliveryMan): Promise<void> {
    const data = PrismaDeliveryManMapper.toPrisma(deliveryMan)

    await this.prisma.user.create({
      data,
    })
  }

  async findById(id: string): Promise<DeliveryMan | null> {
    const deliveryMan = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!deliveryMan) {
      return null
    }

    return PrismaDeliveryManMapper.toDomain(deliveryMan)
  }

  async findByCpf(cpf: Cpf): Promise<DeliveryMan | null> {
    const deliveryMan = await this.prisma.user.findUnique({
      where: {
        cpf: cpf.value,
      },
    })

    if (!deliveryMan) {
      return null
    }

    return PrismaDeliveryManMapper.toDomain(deliveryMan)
  }

  async save(deliveryMan: DeliveryMan): Promise<void> {
    const data = PrismaDeliveryManMapper.toPrisma(deliveryMan)

    const deliveryManAlreadyExists = await this.findById(
      deliveryMan.id.toString(),
    )
    if (!deliveryManAlreadyExists) {
      throw new Error('Delivery man not found')
    }

    await this.prisma.user.update({
      where: {
        id: deliveryMan.id.toString(),
      },
      data,
    })
  }

  async delete(deliveryMan: DeliveryMan): Promise<void> {
    const deliveryManAlreadyExists = await this.findById(
      deliveryMan.id.toString(),
    )

    if (!deliveryManAlreadyExists) {
      throw new Error('Delivery man not found')
    }

    await this.prisma.user.delete({
      where: {
        id: deliveryMan.id.toString(),
      },
    })
  }

  async exists(id: string): Promise<boolean> {
    const deliveryMans = await this.findById(id)
    return !!deliveryMans
  }
}
