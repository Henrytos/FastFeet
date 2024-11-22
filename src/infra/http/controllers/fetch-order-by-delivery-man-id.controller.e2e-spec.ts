import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { AdministratorFactory } from '@/test/factories/make-administrator'
import { DeliveryAddressFactory } from '@/test/factories/make-delivery-address'
import { DeliveryManFactory } from '@/test/factories/make-delivery-man'
import { OrderFactory } from '@/test/factories/make-order'
import { PhotoFactory } from '@/test/factories/make-photo'
import { RecipientFactory } from '@/test/factories/make-recipient'
import { HttpStatus, INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('FetchDeliveryManController (e2e)', () => {
  let app: INestApplication
  let jwt: JwtService
  let deliveryManFactory: DeliveryManFactory
  let orderFactory: OrderFactory
  let recipientFactory: RecipientFactory
  let photoFactory: PhotoFactory
  let deliveryAddressFactory: DeliveryAddressFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        AdministratorFactory,
        DeliveryManFactory,
        OrderFactory,
        RecipientFactory,
        PhotoFactory,
        DeliveryAddressFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    jwt = moduleRef.get(JwtService)
    deliveryManFactory = moduleRef.get(DeliveryManFactory)
    orderFactory = moduleRef.get(OrderFactory)
    recipientFactory = moduleRef.get(RecipientFactory)
    photoFactory = moduleRef.get(PhotoFactory)
    deliveryAddressFactory = moduleRef.get(DeliveryAddressFactory)

    await app.init()
  })

  test('[GET] /deliverymen/:deliveryMan.id/deliveries ', async () => {
    const deliveryMan = await deliveryManFactory.makePrismaDeliveryMan()
    const recipient = await recipientFactory.makePrismaRecipient()
    const photo = await photoFactory.makePrismaPhoto()
    const deliveryAddress = await deliveryAddressFactory.makeDeliveryAddress()

    await orderFactory.makePrismaOrder({
      deliveryManId: new UniqueEntityID(deliveryMan.id),
      recipientId: new UniqueEntityID(recipient.id),
      photoId: new UniqueEntityID(photo.id),
      deliveryAddressId: new UniqueEntityID(deliveryAddress.id),
    })

    const accessToken = jwt.sign({
      sub: deliveryMan.id,
      role: deliveryMan.role,
    })

    const response = await request(app.getHttpServer())
      .get(`/deliverymen/${deliveryMan.id}/deliveries?page=1&perPage=10`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.status).toBe(HttpStatus.OK)
  })
})
