import { ORDER_STATUS } from '@/core/constants/order-status.enum'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { DeliveryAddressFactory } from '@/test/factories/make-delivery-address'
import { DeliveryManFactory } from '@/test/factories/make-delivery-man'
import { OrderFactory } from '@/test/factories/make-order'
import { RecipientFactory } from '@/test/factories/make-recipient'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import * as nodemailer from 'nodemailer'
import { vi } from 'vitest'
import { waitFor } from '@/test/utils/wait-for'

describe('SendingOrderToRecipientByDeliveryManController (E2E)', () => {
  let app: INestApplication
  let deliveryManFactory: DeliveryManFactory
  let orderFactory: OrderFactory
  let deliveryAddressFactory: DeliveryAddressFactory
  let recipientFactory: RecipientFactory
  let jwt: JwtService

  let sendMailMock: vi.Mock

  beforeEach(async () => {
    // Mock de nodemailer
    vi.mock('nodemailer', () => ({
      createTransport: vi.fn(() => ({
        sendMail: vi.fn().mockResolvedValue({ messageId: '12345' }), // Mock do envio de e-mail
      })),
    }))
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        DeliveryManFactory,
        OrderFactory,
        DeliveryAddressFactory,
        RecipientFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    deliveryManFactory = moduleRef.get(DeliveryManFactory)
    orderFactory = moduleRef.get(OrderFactory)
    deliveryAddressFactory = moduleRef.get(DeliveryAddressFactory)
    recipientFactory = moduleRef.get(RecipientFactory)
    jwt = moduleRef.get(JwtService)

    sendMailMock = (nodemailer.createTransport as vi.Mock).mock.results[0].value
      .sendMail

    await app.init()
  })

  test('[PATCH] /orders/:orderId/pickup', async () => {
    const deliveryMan = await deliveryManFactory.makePrismaDeliveryMan()

    const token = await jwt.sign({
      sub: deliveryMan.id,
      role: deliveryMan.role,
    })

    const recipient = await recipientFactory.makePrismaRecipient()
    const deliveryAddress = await deliveryAddressFactory.makeDeliveryAddress()

    const order = await orderFactory.makePrismaOrder({
      deliveryManId: new UniqueEntityID(deliveryMan.id),
      status: ORDER_STATUS.PENDING,
      recipientId: new UniqueEntityID(recipient.id),
      deliveryAddressId: new UniqueEntityID(deliveryAddress.id),
    })

    const response = await request(app.getHttpServer())
      .patch(`/orders/${order.id}/pickup`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200)
    waitFor(() => {
      expect(sendMailMock).toHaveBeenCalledTimes(1)
      expect(sendMailMock).toHaveBeenCalledWith(
        expect.objectContaining({
          from: process.env.SMTP_USER,
          to: expect.any(String), // Aqui você pode colocar o destinatário esperado
          subject: expect.any(String),
          text: expect.any(String),
        }),
      )
    })
  })
})
