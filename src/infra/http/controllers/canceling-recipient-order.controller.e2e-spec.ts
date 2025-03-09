import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { DeliveryAddressFactory } from '@/test/factories/make-delivery-address'
import { DeliveryManFactory } from '@/test/factories/make-delivery-man'
import { OrderFactory } from '@/test/factories/make-order'
import { RecipientFactory } from '@/test/factories/make-recipient'
import { HttpStatus, INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('CancelingRecipientOrderController(e2e)', () => {
  let app: INestApplication
  let deliveryManFactory: DeliveryManFactory
  let deliveryAddressFactory: DeliveryAddressFactory
  let recipientFactory: RecipientFactory
  let orderFactory: OrderFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        OrderFactory,
        DeliveryManFactory,
        DeliveryAddressFactory,
        RecipientFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    deliveryAddressFactory = moduleRef.get(DeliveryAddressFactory)
    deliveryManFactory = moduleRef.get(DeliveryManFactory)
    recipientFactory = moduleRef.get(RecipientFactory)
    orderFactory = moduleRef.get(OrderFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[PATCH] /orders/:orderId/canceling', async () => {
    const deliveryMan = await deliveryManFactory.makePrismaDeliveryMan()
    const deliveryAddress = await deliveryAddressFactory.makeDeliveryAddress()
    const recipient = await recipientFactory.makePrismaRecipient()

    const order = await orderFactory.makePrismaOrder({
      deliveryManId: new UniqueEntityID(deliveryMan.id),
      deliveryAddressId: new UniqueEntityID(deliveryAddress.id),
      recipientId: new UniqueEntityID(recipient.id),
    })

    const token = await jwt.sign({
      sub: deliveryMan.id,
      role: deliveryMan.role,
    })

    const response = await request(app.getHttpServer())
      .patch(`/orders/${order.id}/canceling`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.status).toBe(HttpStatus.OK)
  })
})
