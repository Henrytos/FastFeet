import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { AdministratorFactory } from '@/test/factories/make-administrator'
import { RecipientFactory } from '@/test/factories/make-recipient'
import { HttpStatus, INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('UpdateRecipientController (e2e)', () => {
  let app: INestApplication
  let jwt: JwtService
  let administratorFactory: AdministratorFactory
  let recipientFactory: RecipientFactory
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [AdministratorFactory, RecipientFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    jwt = moduleRef.get(JwtService)
    administratorFactory = moduleRef.get(AdministratorFactory)
    recipientFactory = moduleRef.get(RecipientFactory)
    prisma = moduleRef.get(PrismaService)
    await app.init()
  })

  test('[PUT] /recipients/recipientId ', async () => {
    const administrator = await administratorFactory.makePrismaAdministrator()
    const token = jwt.sign({
      sub: administrator.id,
      role: administrator.role,
    })

    const recipient = await recipientFactory.makePrismaRecipient()

    const response = await request(app.getHttpServer())
      .put(`/recipients/${recipient.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'John Doe',
        email: 'john.doe@gmail.com',
      })

    expect(response.status).toBe(HttpStatus.CREATED)

    const recipientInDatabase = await prisma.recipient.findUnique({
      where: {
        email: 'john.doe@gmail.com',
      },
    })

    expect(recipientInDatabase).toMatchObject({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
    })
  })
})
