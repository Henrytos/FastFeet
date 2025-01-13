import { getRandomCpfValid } from '@/core/constants/cpf-valid'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { AdministratorFactory } from '@/test/factories/make-administrator'
import { HttpStatus, INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('FetchDeliveryManController (e2e)', () => {
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

  test('[GET] /deliverymen ', async () => {
    const administrator = await administratorFactory.makePrismaAdministrator()

    const CPFS = [getRandomCpfValid(), getRandomCpfValid()]
    await prisma.user.createMany({
      data: [
        {
          name: 'John Doe',
          cpf: CPFS[0],
          passwordHash: '123456789',
          role: 'DELIVERY_MAN',
        },
        {
          name: 'John Doe',
          cpf: CPFS[1],
          passwordHash: '123456789',
          role: 'DELIVERY_MAN',
        },
      ],
    })

    const token = jwt.sign({
      sub: administrator.id,
      role: administrator.role,
    })

    const response = await request(app.getHttpServer())
      .get(`/deliverymen?page=1&perPage=10`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.status).toBe(HttpStatus.OK)
    expect(response.body).toMatchObject({
      user: expect.arrayContaining([
        expect.objectContaining({
          name: 'John Doe',
          cpf: CPFS[0],
        }),
        expect.objectContaining({
          name: 'John Doe',
          cpf: CPFS[1],
        }),
      ]),
    })
  })
})
