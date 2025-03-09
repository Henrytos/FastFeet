import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaOrderMapper } from '@/infra/database/prisma/mappers/prisma-order-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { AdministratorFactory } from '@/test/factories/make-administrator'
import { makeOrder } from '@/test/factories/make-order'
import { HttpStatus, INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('FetchRecentOrderController (e2e)', () => {
  let app: INestApplication
  let jwt: JwtService
  let administratorFactory: AdministratorFactory
  let prisma: PrismaService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [AdministratorFactory, PrismaService],
    }).compile()

    app = moduleRef.createNestApplication()
    jwt = moduleRef.get(JwtService)
    administratorFactory = moduleRef.get(AdministratorFactory)
    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  it('[GET] /orders', async () => {
    const administrator = await administratorFactory.makePrismaAdministrator()
    const accessToken = jwt.sign({
      role: administrator.role,
      sub: administrator.id,
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
      .get('/orders?page=3&perPage=10')
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.status).toBe(HttpStatus.OK)
    expect(response.body).toHaveProperty('orders')

    if (response.body.orders) {
      expect(response.body.orders).toHaveLength(1)
    }
  })
})
