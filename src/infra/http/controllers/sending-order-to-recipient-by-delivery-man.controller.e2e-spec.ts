import { ORDER_STATUS } from '@/core/constants/order-status.enum'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { DeliveryAddressFactory } from '@/test/factories/make-delivery-address'
import { DeliveryManFactory } from '@/test/factories/make-delivery-man'
import { OrderFactory } from '@/test/factories/make-order'
import { RecipientFactory } from '@/test/factories/make-recipient'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('SendingOrderToRecipientByDeliveryManController (E2E)', () => {
  let app: INestApplication
  let deliveryManFactory: DeliveryManFactory
  let orderFactory: OrderFactory
  let deliveryAddressFactory: DeliveryAddressFactory
  let recipientFactory: RecipientFactory
  let jwt: JwtService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        DeliveryManFactory,
        OrderFactory,
        DeliveryAddressFactory,
        RecipientFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    deliveryManFactory = moduleRef.get(DeliveryManFactory)
    orderFactory = moduleRef.get(OrderFactory)
    deliveryAddressFactory = moduleRef.get(DeliveryAddressFactory)
    recipientFactory = moduleRef.get(RecipientFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[PATCH] /orders/:orderId/pickup', async () => {
    const deliveryMan = await deliveryManFactory.makePrismaDeliveryMan()

    const token = await jwt.sign({
      sub: deliveryMan.id,
      role: deliveryMan.role,
    })

    const recipient = await recipientFactory.makePrismaRecipient()
    const deliveryAddress = await deliveryAddressFactory.makeDeliveryAddress()

    const order = await orderFactory.makePrismaOrder({
      deliveryManId: new UniqueEntityID(deliveryMan.id),
      status: ORDER_STATUS.PENDING,
      recipientId: new UniqueEntityID(recipient.id),
      deliveryAddressId: new UniqueEntityID(deliveryAddress.id),
    })

    const response = await request(app.getHttpServer())
      .patch(`/orders/${order.id}/pickup`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200)
  })
})
