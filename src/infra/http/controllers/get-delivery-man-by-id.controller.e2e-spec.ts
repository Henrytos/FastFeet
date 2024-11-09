import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { DeliveryManFactory } from '@/test/factories/make-delivery-man'
import { HttpStatus, INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('GetDeliveryByIdController (e2e)', () => {
  let app: INestApplication
  let jwt: JwtService
  let deliveryManFactory: DeliveryManFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [DeliveryManFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    jwt = moduleRef.get(JwtService)
    deliveryManFactory = moduleRef.get(DeliveryManFactory)
    await app.init()
  })

  test('[GET] /deliveryMan/{deliveryManId} ', async () => {
    const deliveryMan = await deliveryManFactory.makePrismaDeliveryMan({
      name: 'John Doe',
    })

    const token = jwt.sign({
      sub: deliveryMan.id,
      role: deliveryMan.role,
    })

    const response = await request(app.getHttpServer())
      .get(`/deliveryMan/${deliveryMan.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.status).toBe(HttpStatus.OK)
    expect(response.body).toMatchObject({
      user: expect.objectContaining({
        name: 'John Doe',
      }),
    })
  })
})
