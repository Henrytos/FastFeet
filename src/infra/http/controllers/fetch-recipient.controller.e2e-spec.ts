import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaRecipientMapper } from '@/infra/database/prisma/mappers/prisma-recipient-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { AdministratorFactory } from '@/test/factories/make-administrator'
import {
  makeRecipient,
  RecipientFactory,
} from '@/test/factories/make-recipient'
import { HttpStatus, INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe(' fetch recipient controller [E2E]', () => {
  let app: INestApplication
  let prisma: PrismaService
  let recipientFactory: RecipientFactory
  let administratorFactory: AdministratorFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        RecipientFactory,
        AdministratorFactory,
        JwtService,
        PrismaService,
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    recipientFactory = moduleRef.get(RecipientFactory)
    administratorFactory = moduleRef.get(AdministratorFactory)
    jwt = moduleRef.get(JwtService)
    prisma = moduleRef.get(PrismaService)

    expect(app).toBeDefined()
    await app.init()
  })

  test('[GET] /recipients', async () => {
    await recipientFactory.makePrismaRecipient({
      email: 'jhonDoe@gmail.com',
      name: 'John Doe',
    })

    const data = Array.from({ length: 20 }).map(() => {
      return PrismaRecipientMapper.toPrisma(makeRecipient())
    })

    await prisma.recipient.createMany({
      data,
    })

    const administrator = await administratorFactory.makePrismaAdministrator()

    const token = await jwt.sign({
      role: administrator.role,
      sub: administrator.id,
    })

    const response = await request(app.getHttpServer())
      .get('/recipients?page=3')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.status).toBe(HttpStatus.OK)
    expect(response.body).toHaveProperty('recipients')
    expect(response.body.recipients).toHaveLength(1)
    expect(response.body.recipients).toEqual([
      expect.objectContaining({
        id: expect.any(String),
        email: 'jhonDoe@gmail.com',
        name: 'John Doe',
      }),
    ])
  })
})
