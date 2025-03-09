import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { DeliveryManFactory } from '@/test/factories/make-delivery-man'
import { HttpStatus, INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('UploadPhotoForStorageController (e2e)', () => {
  let app: INestApplication
  let jwt: JwtService
  let deliveryManFactory: DeliveryManFactory

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [JwtService, DeliveryManFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    jwt = moduleRef.get(JwtService)
    deliveryManFactory = moduleRef.get(DeliveryManFactory)
    await app.init()
  })

  test('[POST] /upload/file', async () => {
    const deliveryMan = await deliveryManFactory.makePrismaDeliveryMan()
    const token = await jwt.sign({
      role: deliveryMan.role,
      sub: deliveryMan.id,
    })

    const response = await request(app.getHttpServer())
      .post('/upload/photo')
      .set('Authorization', `Bearer ${token}`)
      .attach('file', './test/files/sample-file.jpeg')

    expect(response.status).toBe(HttpStatus.CREATED)
  })
})
