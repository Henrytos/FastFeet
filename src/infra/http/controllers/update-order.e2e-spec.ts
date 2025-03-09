import { ORDER_STATUS } from '@/core/constants/order-status.enum'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { AdministratorFactory } from '@/test/factories/make-administrator'
import { DeliveryAddressFactory } from '@/test/factories/make-delivery-address'
import { DeliveryManFactory } from '@/test/factories/make-delivery-man'
import { OrderFactory } from '@/test/factories/make-order'
import { RecipientFactory } from '@/test/factories/make-recipient'
import { HttpStatus, INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('UpdateOrderCOntroller (e2e)', () => {
  let app: INestApplication
  let jwt: JwtService
  let administratorFactory: AdministratorFactory
  let orderFactory: OrderFactory
  let deliveryAddressFactory: DeliveryAddressFactory
  let deliveryManFactory: DeliveryManFactory
  let recipientFactory: RecipientFactory

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      controllers: [],
      providers: [
        AdministratorFactory,
        OrderFactory,
        DeliveryAddressFactory,
        DeliveryManFactory,
        RecipientFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    jwt = moduleRef.get(JwtService)
    administratorFactory = moduleRef.get(AdministratorFactory)
    orderFactory = moduleRef.get(OrderFactory)
    deliveryAddressFactory = moduleRef.get(DeliveryAddressFactory)
    deliveryManFactory = moduleRef.get(DeliveryManFactory)
    recipientFactory = moduleRef.get(RecipientFactory)

    await app.init()
  })

  test('', async () => {
    const administrator = await administratorFactory.makePrismaAdministrator()
    const deliveryMan = await deliveryManFactory.makePrismaDeliveryMan()
    const deliveryAddress = await deliveryAddressFactory.makeDeliveryAddress()
    const recipient = await recipientFactory.makePrismaRecipient()

    const order = await orderFactory.makePrismaOrder({
      deliveryAddressId: new UniqueEntityID(deliveryAddress.id),
      deliveryManId: new UniqueEntityID(deliveryMan.id),
      recipientId: new UniqueEntityID(recipient.id),
      status: ORDER_STATUS.PENDING,
    })
    const token = await jwt.sign({
      sub: administrator.id,
      role: administrator.role,
    })

    const response = await request(app.getHttpServer())
      .put(`/orders/${order.id}`)
      .set(`Authorization`, `Bearer ${token}`)
      .send({
        status: ORDER_STATUS.CANCELED,
        deliveryManId: deliveryMan.id,
        deliveryAt: new Date(),
        withdrawnAt: new Date(),
        address: {
          state: 'São Paulo',
          city: 'São Paulo',
          neighborhood: 'Flor de maio',
          street: 'Flor de maio',
          zip: '02364159',
          number: '88',
          latitude: '01840931840913804',
          longitude: '3289123901823092180',
        },
      })

    expect(response.status).toBe(HttpStatus.OK)
  })
})
