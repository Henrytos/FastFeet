import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { AdministratorsRepository } from '@/domain/delivery/application/repositories/administrators-repository';
import { PrismaAdministratorsRepository } from './prisma/repositories/prisma-administrators-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: AdministratorsRepository,
      useClass: PrismaAdministratorsRepository,
    },
  ],
  exports: [AdministratorsRepository],
})
export class DatabaseModule {}
