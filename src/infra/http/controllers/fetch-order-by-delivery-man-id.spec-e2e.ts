import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { AdministratorFactory } from '@/test/factories/make-administrator'
import { DeliveryManFactory } from '@/test/factories/make-delivery-man'
import { OrderFactory } from '@/test/factories/make-order'
import { HttpStatus, INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('FetchDeliveryManController (e2e)', () => {
  let app: INestApplication
  let jwt: JwtService
  let deliveryManFactory: DeliveryManFactory
  let orderFactory: OrderFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [AdministratorFactory, DeliveryManFactory, OrderFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    jwt = moduleRef.get(JwtService)
    await app.init()
  })

  test('[GET] /deliverymen/:deliveryMan.id/deliveries ', async () => {
    const deliveryMan = await deliveryManFactory.makePrismaDeliveryMan({})

    orderFactory.makePrismaOrder({
      deliveryManId: new UniqueEntityID(deliveryMan.id),
    })

    const accessToken = jwt.sign({ id: deliveryMan.id, role: deliveryMan.role })

    const response = await request(app.getHttpServer())
      .get(`/deliverymen/${deliveryMan.id}/deliveries?page=1&perPage=10`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.status).toBe(HttpStatus.OK)
  })
})
