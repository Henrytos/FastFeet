import { DeliveryAddressRepository } from '@/domain/delivery/application/repositories/delivery-address-repository'
import { DeliveryAddress } from '@/domain/delivery/enterprise/entities/delivery-address'
import { PrismaService } from '../prisma.service'
import { Injectable } from '@nestjs/common'
import { PrismaDeliveryAddressMapper } from '../mappers/prisma-delivery-address-mapper'

@Injectable()
export class PrismaDeliveryAddressRepository
  implements DeliveryAddressRepository
{
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<DeliveryAddress | null> {
    const deliveryAddress = await this.prisma.address.findUnique({
      where: { id },
    })

    if (!deliveryAddress) {
      return null
    }

    return PrismaDeliveryAddressMapper.toDomain(deliveryAddress)
  }

  async delete(id: string): Promise<void> {
    await this.prisma.address.delete({
      where: {
        id,
      },
    })
  }

  async create(deliveryAddress: DeliveryAddress): Promise<void> {
    const data = PrismaDeliveryAddressMapper.toPrisma(deliveryAddress)

    await this.prisma.address.create({ data })
  }

  async save(deliveryAddress: DeliveryAddress): Promise<void> {
    const data = PrismaDeliveryAddressMapper.toPrisma(deliveryAddress)

    await this.prisma.address.update({
      where: {
        id: deliveryAddress.id.toString(),
      },
      data,
    })
  }

  async exists(id: string): Promise<boolean> {
    const deliveryAddress = await this.findById(id)
    return !!deliveryAddress
  }
}
