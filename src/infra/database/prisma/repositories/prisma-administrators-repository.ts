import { AdministratorsRepository } from '@/domain/delivery/application/repositories/administrators-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Cpf } from '@/domain/delivery/enterprise/entities/value-object/cpf';
import { Administrator } from '@/domain/delivery/enterprise/entities/administrator';
import { PrismaAdministratorMapper } from '../mappers/prisma-administrator-mapper';

@Injectable()
export class PrismaAdministratorsRepository
  implements AdministratorsRepository
{
  constructor(private prisma: PrismaService) {}

  async findByCpf(cpf: Cpf): Promise<Administrator | null> {
    const administrator = await this.prisma.user.findUnique({
      where: {
        cpf: cpf.value,
      },
    });

    if (!administrator) {
      return null;
    }

    return PrismaAdministratorMapper.toDomain(administrator);
  }
  findById(id: string): Promise<Administrator | null> {
    throw new Error('Method not implemented.');
  }
  async create(administrator: Administrator): Promise<void> {
    const data = PrismaAdministratorMapper.toPrisma(administrator);

    await this.prisma.user.create({
      data,
    });
  }
}
