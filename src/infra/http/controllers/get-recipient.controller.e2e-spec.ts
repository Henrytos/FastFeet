import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { AdministratorFactory } from '@/test/factories/make-administrator'
import { RecipientFactory } from '@/test/factories/make-recipient'
import { HttpStatus, INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('GetRecipientController (e2e)', () => {
  let app: INestApplication
  let jwt: JwtService
  let administratorFactory: AdministratorFactory
  let recipientFactory: RecipientFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [AdministratorFactory, RecipientFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    jwt = moduleRef.get(JwtService)

    administratorFactory = moduleRef.get(AdministratorFactory)
    recipientFactory = moduleRef.get(RecipientFactory)
    await app.init()
  })

  test('[GET] /recipients/{recipientId} ', async () => {
    const administrator = await administratorFactory.makePrismaAdministrator()
    const recipient = await recipientFactory.makePrismaRecipient()

    const accessToken = jwt.sign({
      sub: administrator.id,
      role: 'ADMINISTRATOR',
    })

    const response = await request(app.getHttpServer())
      .get(`/recipients/${recipient.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()
    expect(response.status).toBe(HttpStatus.NO_CONTENT)
  })
})
