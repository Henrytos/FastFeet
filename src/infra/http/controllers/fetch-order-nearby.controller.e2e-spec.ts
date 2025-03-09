import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaOrderMapper } from '@/infra/database/prisma/mappers/prisma-order-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { AdministratorFactory } from '@/test/factories/make-administrator'
import { DeliveryManFactory } from '@/test/factories/make-delivery-man'
import { makeOrder } from '@/test/factories/make-order'
import { HttpStatus, INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('FetchRecentOrderController (e2e)', () => {
  let app: INestApplication
  let jwt: JwtService
  let deliveryManFactory: DeliveryManFactory
  let prisma: PrismaService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [AdministratorFactory, DeliveryManFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    jwt = moduleRef.get(JwtService)
    deliveryManFactory = moduleRef.get(DeliveryManFactory)
    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  it.skip('[GET] /orders/nearby?page=1', async () => {
    const deliveryMan = await deliveryManFactory.makePrismaDeliveryMan()
    const accessToken = jwt.sign({
      role: deliveryMan.role,
      sub: deliveryMan.id,
    })

    const dataOrders = Array.from({ length: 21 }).map(() => {
      const order = PrismaOrderMapper.toPrisma(
        makeOrder({
          recipientId: null,
          deliveryAddressId: null,
          photoId: null,
          deliveryManId: null,
        }),
      )
      return order
    })

    await prisma.order.createMany({ data: dataOrders })

    const response = await request(app.getHttpServer())
      .get('/orders/nearby?page=1')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        latitude: -23.55052,
        longitude: -46.633308,
      })

    expect(response.status).toBe(HttpStatus.OK)
    expect(response.body).toHaveProperty('orders')

    if (response.body.orders) {
      expect(response.body.orders).toHaveLength(1)
    }
  })
})
