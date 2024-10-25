import { Module } from '@nestjs/common';
import { RolesGuards } from './roles.guards';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

@Module({
  providers: [RolesGuards, PrismaService],
  exports: [RolesGuards],
})
export class GuardsModule {}
