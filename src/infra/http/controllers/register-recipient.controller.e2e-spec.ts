import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { AdministratorFactory } from '@/test/factories/make-administrator'
import { HttpStatus, INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('RegisterRecipientController (e2e)', () => {
  let app: INestApplication
  let jwt: JwtService
  let administratorFactory: AdministratorFactory
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [AdministratorFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    jwt = moduleRef.get(JwtService)
    administratorFactory = moduleRef.get(AdministratorFactory)
    prisma = moduleRef.get(PrismaService)
    await app.init()
  })

  test('[POST] /recipients ', async () => {
    const administrator = await administratorFactory.makePrismaAdministrator()
    const token = jwt.sign({
      sub: administrator.id,
      role: administrator.role,
    })

    const response = await request(app.getHttpServer())
      .post(`/recipients`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'John Doe Updated',
        email: 'john.doe@gmail.com',
      })

    expect(response.status).toBe(HttpStatus.CREATED)

    const deliveryManOnDatabase = await prisma.recipient.findUnique({
      where: {
        email: 'john.doe@gmail.com',
      },
    })
    expect(deliveryManOnDatabase).toBeTruthy()
  })
})
