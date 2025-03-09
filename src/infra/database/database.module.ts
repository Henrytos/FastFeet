import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { AdministratorsRepository } from '@/domain/delivery/application/repositories/administrators-repository'
import { PrismaAdministratorsRepository } from './prisma/repositories/prisma-administrators-repository'
import { DeliveryMansRepository } from '@/domain/delivery/application/repositories/delivery-mans-repository'
import { PrismaDeliveryMansRepository } from './prisma/repositories/prisma-delivery-mans-repository'
import { NotificationsRepository } from '@/domain/notification/application/repositories/notifications-repository'
import { OrdersRepository } from '@/domain/delivery/application/repositories/orders-repository'
import { PrismaOrdersRepository } from './prisma/repositories/prisma-orders-repository'
import { PhotosRepository } from '@/domain/delivery/application/repositories/photos-repository'
import { PrismaPhotosRepository } from './prisma/repositories/prisma-photos-repository'
import { RecipientsRepository } from '@/domain/delivery/application/repositories/recipients-repository'
import { PrismaRecipientsRepository } from './prisma/repositories/prisma-recipients-repository'
import { PrismaDeliveryAddressRepository } from './prisma/repositories/prisma-delivery-address-repository'
import { DeliveryAddressRepository } from '@/domain/delivery/application/repositories/delivery-address-repository'
import { PrismaNotificationsRepository } from './prisma/repositories/prisma-notifications-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: AdministratorsRepository,
      useClass: PrismaAdministratorsRepository,
    },
    {
      provide: DeliveryAddressRepository,
      useClass: PrismaDeliveryAddressRepository,
    },
    {
      provide: DeliveryMansRepository,
      useClass: PrismaDeliveryMansRepository,
    },
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationsRepository,
    },
    {
      provide: OrdersRepository,
      useClass: PrismaOrdersRepository,
    },
    {
      provide: PhotosRepository,
      useClass: PrismaPhotosRepository,
    },
    {
      provide: RecipientsRepository,
      useClass: PrismaRecipientsRepository,
    },
  ],
  exports: [
    PrismaService,
    AdministratorsRepository,
    DeliveryAddressRepository,
    DeliveryMansRepository,
    NotificationsRepository,
    OrdersRepository,
    PhotosRepository,
    RecipientsRepository,
  ],
})
export class DatabaseModule {}
