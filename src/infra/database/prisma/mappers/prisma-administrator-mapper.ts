import { Administrator } from '@/domain/delivery/enterprise/entities/administrator';
import { Cpf } from '@/domain/delivery/enterprise/entities/value-object/cpf';
import { Prisma, User as PrismaAdministrator } from '@prisma/client';

export class PrismaAdministratorMapper {
  static toDomain(raw: PrismaAdministrator): Administrator {
    return Administrator.create({
      cpf: Cpf.create(raw.cpf),
      name: raw.name,
      password: raw.passwordHash,
    });
  }

  static toPrisma(
    administrator: Administrator,
  ): Prisma.UserUncheckedCreateInput {
    return {
      id: administrator.id.toString(),
      cpf: administrator.cpf.value,
      name: administrator.name,
      passwordHash: administrator.password,
      role: 'ADMINISTRATOR',
    };
  }
}
