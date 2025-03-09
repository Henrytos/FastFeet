import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { AdministratorFactory } from '@/test/factories/make-administrator'
import { DeliveryManFactory } from '@/test/factories/make-delivery-man'
import { HttpStatus, INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('DeleteDeliveryManController (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService
  let administratorFactory: AdministratorFactory
  let deliveryManFactory: DeliveryManFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [AdministratorFactory, DeliveryManFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    administratorFactory = moduleRef.get(AdministratorFactory)
    deliveryManFactory = moduleRef.get(DeliveryManFactory)
    await app.init()
  })

  test('[DELETE] /delivery-man/{deliveryManId} ', async () => {
    const administrator = await administratorFactory.makePrismaAdministrator()
    const deliveryman = await deliveryManFactory.makePrismaDeliveryMan()

    const accessToken = jwt.sign({
      sub: administrator.id,
      role: 'ADMINISTRATOR',
    })

    const response = await request(app.getHttpServer())
      .delete(`/delivery-man/${deliveryman.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()
    expect(response.status).toBe(HttpStatus.NO_CONTENT)

    const deliveryMaOnDatabase = await prisma.user.findUnique({
      where: {
        id: deliveryman.id,
      },
    })

    expect(deliveryMaOnDatabase).toBeNull()
  })
})
