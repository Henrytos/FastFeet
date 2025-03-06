import { ORDER_STATUS } from '@/core/constants/order-status.enum'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { DeliveryAddressFactory } from '@/test/factories/make-delivery-address'
import { DeliveryManFactory } from '@/test/factories/make-delivery-man'
import { OrderFactory } from '@/test/factories/make-order'
import { PhotoFactory } from '@/test/factories/make-photo'
import { RecipientFactory } from '@/test/factories/make-recipient'
import { GetPreviousDateByTime } from '@/test/utils/get-previous-date-by-time'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('MarkAnOrderAsDeliveredController (E2E)', () => {
  let app: INestApplication
  let deliveryManFactory: DeliveryManFactory
  let orderFactory: OrderFactory
  let deliveryAddressFactory: DeliveryAddressFactory
  let recipientFactory: RecipientFactory
  let photoFactory: PhotoFactory
  let jwt: JwtService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        DeliveryManFactory,
        OrderFactory,
        DeliveryAddressFactory,
        RecipientFactory,
        PhotoFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    deliveryManFactory = moduleRef.get(DeliveryManFactory)
    orderFactory = moduleRef.get(OrderFactory)
    deliveryAddressFactory = moduleRef.get(DeliveryAddressFactory)
    recipientFactory = moduleRef.get(RecipientFactory)
    photoFactory = moduleRef.get(PhotoFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[PATCH] /orders/:orderId/delivered', async () => {
    const deliveryMan = await deliveryManFactory.makePrismaDeliveryMan()

    const token = await jwt.sign({
      sub: deliveryMan.id,
      role: deliveryMan.role,
    })

    const recipient = await recipientFactory.makePrismaRecipient()
    const deliveryAddress = await deliveryAddressFactory.makeDeliveryAddress()
    const photo = await photoFactory.makePrismaPhoto()
    const getPreviousDateByTime = new GetPreviousDateByTime()
    const order = await orderFactory.makePrismaOrder({
      deliveryManId: new UniqueEntityID(deliveryMan.id),
      status: ORDER_STATUS.WITHDRAWN,
      recipientId: new UniqueEntityID(recipient.id),
      deliveryAddressId: new UniqueEntityID(deliveryAddress.id),
      withdrawnAt: getPreviousDateByTime.differenceInDays(1),
      createdAt: getPreviousDateByTime.differenceInDays(2),
    })

    const response = await request(app.getHttpServer())
      .patch(`/orders/${order.id}/delivered`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        photoId: photo.id.toString(),
      })

    expect(response.status).toBe(200)
  })
})
