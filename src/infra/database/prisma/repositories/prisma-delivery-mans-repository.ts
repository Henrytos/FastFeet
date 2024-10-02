import { DeliveryMansRepository } from '@/domain/delivery/application/repositories/delivery-mans-repository';
import { DeliveryMan } from '@/domain/delivery/enterprise/entities/delivery-man';
import { Cpf } from '@/domain/delivery/enterprise/entities/value-object/cpf';
import { Injectable } from '@nestjs/common';
import { PrismaDeliveryManMapper } from '../mappers/prisma-delivery-man-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaDeliveryMansRepository implements DeliveryMansRepository {
  constructor(private prisma: PrismaService) {}

  async create(deliveryMan: DeliveryMan): Promise<void> {
    const data = PrismaDeliveryManMapper.toPrisma(deliveryMan);

    await this.prisma.user.create({
      data,
    });
  }

  async findById(id: string): Promise<DeliveryMan | null> {
    const deliveryMan = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!deliveryMan) {
      return null;
    }

    return PrismaDeliveryManMapper.toDomain(deliveryMan);
  }

  async findByCpf(cpf: Cpf): Promise<DeliveryMan | null> {
    const deliveryMan = await this.prisma.user.findUnique({
      where: {
        cpf: cpf.value,
      },
    });

    if (!deliveryMan) {
      return null;
    }

    return PrismaDeliveryManMapper.toDomain(deliveryMan);
  }

  async save(deliveryMan: DeliveryMan): Promise<void> {
    const data = PrismaDeliveryManMapper.toPrisma(deliveryMan);

    const deliveryManAlreadyExists = await this.findById(
      deliveryMan.id.toString(),
    );
    if (!deliveryManAlreadyExists) {
      throw new Error('Delivery man not found');
    }

    await this.prisma.user.update({
      where: {
        id: deliveryMan.id.toString(),
      },
      data,
    });
  }

  async delete(deliveryMan: DeliveryMan): Promise<void> {
    const deliveryManAlreadyExists = await this.findById(
      deliveryMan.id.toString(),
    );

    if (!deliveryManAlreadyExists) {
      throw new Error('Delivery man not found');
    }

    await this.prisma.user.delete({
      where: {
        id: deliveryMan.id.toString(),
      },
    });
  }
}
