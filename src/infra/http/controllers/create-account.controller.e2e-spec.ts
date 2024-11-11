import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { AdministratorFactory } from '@/test/factories/make-administrator'
import { HttpStatus, INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('CreateAccountController (e2e)', () => {
  let app: INestApplication
  let jwt: JwtService
  let administratorFactory: AdministratorFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [AdministratorFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    jwt = moduleRef.get(JwtService)
    administratorFactory = moduleRef.get(AdministratorFactory)
    await app.init()
  })

  test('[POST] /accounts/admin ', async () => {
    const response = await request(app.getHttpServer())
      .post('/accounts/admin')
      .send({
        name: 'John Doe',
        cpf: '12345678901',
        password: 'password',
      })

    expect(response.status).toBe(HttpStatus.CREATED)
  })

  test('[POST] /accounts/user ', async () => {
    const administrator = await administratorFactory.makePrismaAdministrator()

    const accessToken = jwt.sign({
      sub: administrator.id,
      role: administrator.role,
    })

    const response = await request(app.getHttpServer())
      .post('/accounts/user')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'John Doe',
        cpf: '12345678902',
        password: 'password',
      })

    expect(response.status).toBe(HttpStatus.CREATED)
  })
})
