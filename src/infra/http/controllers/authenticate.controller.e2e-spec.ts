import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { AdministratorFactory } from '@/test/factories/make-administrator'
import { HttpStatus, INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { hashSync } from 'bcryptjs'
import request from 'supertest'

describe('CreateAccountController (e2e)', () => {
  let app: INestApplication
  let administratorFactory: AdministratorFactory
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [AdministratorFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    administratorFactory = moduleRef.get(AdministratorFactory)

    await app.init()
  })

  test('[POST] /sessions ', async () => {
    const administrator = await administratorFactory.makePrismaAdministrator({
      password: hashSync('password', 8),
    })

    const response = await request(app.getHttpServer()).post('/sessions').send({
      cpf: administrator.cpf,
      password: 'password',
    })

    expect(response.status).toBe(HttpStatus.OK)
    expect(response.body).toHaveProperty('accessToken')
  })
})
