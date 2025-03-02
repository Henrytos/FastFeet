import { ORDER_STATUS } from '@/core/constants/order-status.enum'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { AdministratorFactory } from '@/test/factories/make-administrator'
import { DeliveryAddressFactory } from '@/test/factories/make-delivery-address'
import { OrderFactory } from '@/test/factories/make-order'
import { RecipientFactory } from '@/test/factories/make-recipient'
import { HttpStatus, INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('GetORderByIdController (e2e)', () => {
  let app: INestApplication
  let orderFactory: OrderFactory
  let recipientFactory: RecipientFactory
  let deliveryAddressFactory: DeliveryAddressFactory
  let administratorFactory: AdministratorFactory
  let jwt: JwtService

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        OrderFactory,
        AdministratorFactory,
        PrismaService,
        RecipientFactory,
        DeliveryAddressFactory,
      ],
    }).compile()

    app = module.createNestApplication()
    orderFactory = module.get(OrderFactory)
    administratorFactory = module.get(AdministratorFactory)
    jwt = module.get(JwtService)
    recipientFactory = module.get(RecipientFactory)
    deliveryAddressFactory = module.get(DeliveryAddressFactory)

    await app.init()
  })

  test('[GET] /orders/{orderId}', async () => {
    const administrator = await administratorFactory.makePrismaAdministrator()
    const recipient = await recipientFactory.makePrismaRecipient()
    const deliveryAddress = await deliveryAddressFactory.makeDeliveryAddress()

    const order = await orderFactory.makePrismaOrder({
      deliveryAddressId: new UniqueEntityID(deliveryAddress.id),
      recipientId: new UniqueEntityID(recipient.id),
      status: ORDER_STATUS.PENDING,
    })
    const token = jwt.sign({
      sub: administrator.id,
      role: administrator.role,
    })

    const response = await request(app.getHttpServer())
      .get(`/orders/${order.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.status).toBe(HttpStatus.OK)
  })
})
