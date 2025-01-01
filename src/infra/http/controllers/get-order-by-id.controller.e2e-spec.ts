import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { AdministratorFactory } from '@/test/factories/make-administrator'
import { OrderFactory } from '@/test/factories/make-order'
import { HttpStatus, INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('GetORderByIdController (e2e)', () => {
  let app: INestApplication
  let orderFactory: OrderFactory
  let administratorFactory: AdministratorFactory
  let jwt: JwtService

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
      providers: [OrderFactory, AdministratorFactory, PrismaService],
    }).compile()

    app = module.createNestApplication()
    orderFactory = module.get(OrderFactory)
    administratorFactory = module.get(AdministratorFactory)
    jwt = module.get(JwtService)

    await app.init()
  })

  test('[GET] /orders/{orderId}', async () => {
    const administrator = await administratorFactory.makePrismaAdministrator()
    const order = await orderFactory.makePrismaOrder()
    const token = jwt.sign({
      sub: administrator.id,
      role: administrator.role,
    })

    const response = await request(app.getHttpServer())
      .get(`/orders/${order.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.status).toBe(HttpStatus.OK)
    expect(response.body.order).toMatchObject({
      deliveryManId: order.deliveryManId,
      recipientId: order.recipientId,
      deliveryAddressId: order.deliveryAddressId,
      status: order.orderStatus,
      deliveryAt: order.deliveryAt,
      withdrawnAt: order.withdrawnAt,
      photoId: order.photoId,
    })
  })
})
