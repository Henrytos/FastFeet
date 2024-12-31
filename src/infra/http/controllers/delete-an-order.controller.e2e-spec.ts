import { HttpStatus, INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from '@/infra/app.module'
import { OrderFactory } from '@/test/factories/make-order'
import { AdministratorFactory } from '@/test/factories/make-administrator'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import request from 'supertest'

describe('DeleteAnOrderController (e2e)', () => {
  let app: INestApplication
  let orderFactory: OrderFactory
  let administratorFactory: AdministratorFactory
  let jwt: JwtService
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        OrderFactory,
        AdministratorFactory,
        JwtService,
        PrismaService,
      ],
    }).compile()

    orderFactory = moduleRef.get(OrderFactory)
    administratorFactory = moduleRef.get(AdministratorFactory)
    jwt = moduleRef.get(JwtService)
    prisma = moduleRef.get(PrismaService)

    app = moduleRef.createNestApplication()
    await app.init()
  })
  test('[DELETE] /orders/{orderId} ', async () => {
    const administrator = await administratorFactory.makePrismaAdministrator()
    const token = jwt.sign({
      sub: administrator.id,
      role: administrator.role,
    })

    const order = await orderFactory.makePrismaOrder()
    const response = await request(app.getHttpServer())
      .delete(`/orders/${order.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.status).toBe(HttpStatus.NO_CONTENT)

    const orderOnDatabase = await prisma.order.findFirst({
      where: {
        id: order.id,
      },
    })
    expect(orderOnDatabase).toBeNull()
  })
})
