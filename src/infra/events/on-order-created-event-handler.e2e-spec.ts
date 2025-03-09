import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { AdministratorFactory } from '@/test/factories/make-administrator'
import { RecipientFactory } from '@/test/factories/make-recipient'
import { HttpStatus, INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { $Enums } from '@prisma/client'
import request from 'supertest'
import { waitFor } from '@/test/utils/wait-for'
import { NodemailerSendEmailToUser } from '../email/node-mailer-send-email.service'
import { randomUUID } from 'crypto'
import { Test } from '@nestjs/testing'
import { AppModule } from '../app.module'

describe.skip('RegisterOrderForRecipientController (MOCK)', () => {
  let app: INestApplication
  let jwt: JwtService
  let administratorFactory: AdministratorFactory
  let recipientFactory: RecipientFactory
  let prisma: PrismaService

  let sendMailMock: unknown

  // beforeAll(async () => {
  //   // Mock de nodemailer
  //   // vi.mock('nodemailer', () => ({
  //   //   createTransport: vi.fn(() => ({
  //   //     sendMail: vi.fn().mockResolvedValue({ messageId: '12345' }), // Mock do envio de e-mail
  //   //   })),
  //   // }))

  //   const moduleRef = await Test.createTestingModule({
  //     imports: [AppModule, DatabaseModule],
  //     providers: [AdministratorFactory, RecipientFactory],
  //   }).compile()

  //   app = moduleRef.createNestApplication()
  //   jwt = moduleRef.get(JwtService)
  //   recipientFactory = moduleRef.get(RecipientFactory)
  //   administratorFactory = moduleRef.get(AdministratorFactory)
  //   prisma = moduleRef.get(PrismaService)

  //   sendMailMock = (nodemailer.createTransport as vi.Mock).mock.results[0].value
  //     .sendMail

  //   await app.init()
  // })

  it.skip('should send email at mock', async () => {
    const administrator = await administratorFactory.makePrismaAdministrator()

    const accessToken = await jwt.sign({
      role: administrator.role,
      sub: administrator.id,
    })

    const recipient = await recipientFactory.makePrismaRecipient()

    // Fazer o pedido via API
    const response = await request(app.getHttpServer())
      .post(`/orders/${recipient.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        state: 'example-state',
        city: 'example-city',
        neighborhood: 'example-neighborhood',
        street: 'example-street',
        zip: 'example-zip',
        number: 'example-number',
        latitude: '12312312312312',
        longitude: '12312312312312',
      })

    // Verificação da criação do pedido
    expect(response.status).toBe(HttpStatus.CREATED)

    const order = await prisma.order.findFirstOrThrow({
      where: {
        recipientId: recipient.id,
      },
    })
    expect(order).toBeTruthy()

    const deliveryAddressInDatabase = await prisma.address.findFirstOrThrow({
      where: {
        orders: {
          some: {
            id: order.id,
          },
        },
      },
    })

    expect(deliveryAddressInDatabase).toBeTruthy()

    const recipientInDatabase = await prisma.recipient.findFirstOrThrow({
      where: {
        id: recipient.id,
      },
    })
    expect(recipientInDatabase).toBeTruthy()

    const administratorInDatabase = await prisma.user.findMany()
    expect(administratorInDatabase).toBeTruthy()

    expect(order).toMatchObject(
      expect.objectContaining({
        id: expect.any(String),
        orderStatus: $Enums.OrderStatus.pending,
        recipientId: recipientInDatabase.id,
        deliveryAddressId: deliveryAddressInDatabase.id,
      }),
    )

    waitFor(() => {
      // Verificação de que o e-mail foi enviado
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

describe('RegisterOrderForRecipientController (INTEGRATION)', () => {
  let app: INestApplication
  let nodemailerSendEmailToUser: NodemailerSendEmailToUser

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [NodemailerSendEmailToUser],
    }).compile()

    app = moduleRef.createNestApplication()
    nodemailerSendEmailToUser = moduleRef.get(NodemailerSendEmailToUser)
    await app.init()
  })
  test('should email in service', async () => {
    const fakeOrderId = randomUUID()

    const data = await nodemailerSendEmailToUser.send({
      to: {
        email: 'jhon-doe@example.com',
        subject: 'Pedido criado',
        body: ` 
          Muito obrigado por confiar em nossa empresa.
          Seu pedido: ${fakeOrderId} foi criado com sucesso!
          Em breve você receberá mais informações sobre o status do pedido.          
          `.trim(),
      },
    })

    expect(data).toBeUndefined()
  })
})
