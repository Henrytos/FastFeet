import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { AdministratorsRepository } from '@/domain/delivery/application/repositories/administrators-repository';
import { PrismaAdministratorsRepository } from './prisma/repositories/prisma-administrators-repository';
import { DeliveryMansRepository } from '@/domain/delivery/application/repositories/delivery-mans-repository';
import { PrismaDeliveryMansRepository } from './prisma/repositories/prisma-delivery-mans-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: AdministratorsRepository,
      useClass: PrismaAdministratorsRepository,
    },
    {
      provide: DeliveryMansRepository,
      useClass: PrismaDeliveryMansRepository,
    },
  ],
  exports: [PrismaService, AdministratorsRepository, DeliveryMansRepository],
})
export class DatabaseModule {}
