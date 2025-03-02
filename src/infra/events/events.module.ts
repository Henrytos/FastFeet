import { ReadNotificationUseCase } from '@/domain/notification/application/use-cases/read-notification-use-case'
import { SendNotificationUseCase } from '@/domain/notification/application/use-cases/send-notification-use-case'
import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { OnOrderCreatedEventHandler } from '@/domain/notification/application/subscribers/on-order-created-event-handler'
import { OnOrderWentOutForDeliveryEventHandler } from '@/domain/notification/application/subscribers/on-order-went-out-for-delivery-event-handler'
import { OnOrderDeliveredEventHandler } from '@/domain/notification/application/subscribers/on-order-delivered-event-handler'
import { OnOrderCancellationEventHandler } from '@/domain/notification/application/subscribers/on-order-cancellation-event-handler'

@Module({
  imports: [DatabaseModule],
  providers: [
    SendNotificationUseCase,
    ReadNotificationUseCase,
    OnOrderCreatedEventHandler,
    OnOrderWentOutForDeliveryEventHandler,
    OnOrderDeliveredEventHandler,
    OnOrderCancellationEventHandler,
  ],
})
export class EventsModule {}
