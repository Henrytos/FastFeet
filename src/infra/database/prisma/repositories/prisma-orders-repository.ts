import { OrdersRepository } from "@/domain/delivery/application/repositories/orders-repository";
import { Order } from "@/domain/delivery/enterprise/entities/order";
import { Coordinate } from "@/test/utils/get-distance-between-coordinate";
import { PrismaOrderMapper } from "../mappers/prisma-oreder-mapper";
import { PrismaService } from "../prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaOrdersRepository implements OrdersRepository {
  constructor(private prisma: PrismaService) {}

  async create(order: Order): Promise<void> {
    const data = PrismaOrderMapper.toPrisma(order);
    await this.prisma.order.create({ data });
  }

  async findById(id: string): Promise<Order | null> {
    const order = await this.prisma.order.findUnique({ where: { id } });
    return PrismaOrderMapper.toDomain(order);
  }

  async findByRecipientId(recipientId: string): Promise<Order | null> {
    const order = await this.prisma.order.findFirst({
      where: { recipientId },
    });

    if (!order) {
      return null;
    }

    return PrismaOrderMapper.toDomain(order);
  }

  async findManyOrdersByRecipientId(
    recipientId: string,
    page: number,
  ): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      where: { recipientId },
      skip: page * 10,
      take: 10,
    });

    return orders.map(PrismaOrderMapper.toDomain);
  }

  async fetchManyNearby(coordinate: Coordinate): Promise<Order[]> {
    throw new Error("Method not implemented.");
  }

  async deleteManyByRecipientId(recipientId: string): Promise<void> {
    await this.prisma.order.deleteMany({ where: { recipientId } });
  }

  async save(order: Order): Promise<void> {
    const data = PrismaOrderMapper.toPrisma(order);

    await this.prisma.order.update({
      where: { id: data.id },
      data,
    });
  }

  async delete(order: Order): Promise<void> {
    await this.prisma.order.delete({ where: { id: order.id.toValue() } });
  }
}
