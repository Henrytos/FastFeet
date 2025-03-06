import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { AdministratorFactory } from '@/test/factories/make-administrator'
import { RecipientFactory } from '@/test/factories/make-recipient'
import { HttpStatus, INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

import * as nodemailer from 'nodemailer'
import { vi } from 'vitest'
import { NodemailerSendEmailToUser } from './node-mailer-send-email.service'
import { waitFor } from '@/test/utils/wait-for'
import { EnvModule } from '../env/env.module'

describe('RegisterOrderForRecipientController (e2e)', () => {
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
    recipientFactory = moduleRef.get(RecipientFactory)
    administratorFactory = moduleRef.get(AdministratorFactory)
    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[POST] /orders/:recipientId', async () => {
    const administrator = await administratorFactory.makePrismaAdministrator()

    const accessToken = await jwt.sign({
      role: administrator.role,
      sub: administrator.id,
    })

    const recipient = await recipientFactory.makePrismaRecipient({
      email: 'franzhenry46@gmail.com',
    })

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

    expect(response.status).toBe(HttpStatus.CREATED)

    const notificationOnDatabase = await prisma.notification.findFirst({
      where: {
        recipientId: recipient.id.toString(),
      },
    })

    expect(notificationOnDatabase).toBeTruthy()
    await new Promise((resolve) => setTimeout(resolve, 4000))
  })
})

// só posso enviar um emaill por vez a uma pessoa

// vi.mock('nodemailer', () => ({
//   createTransport: vi.fn(() => ({
//     sendMail: vi.fn().mockResolvedValue({ messageId: '12345' }), // Mock do envio de e-mail
//   })),
// }))

// describe('NodemailerSendEmailToUser (e2e)', () => {
//   let sendEmailService: NodemailerSendEmailToUser
//   let sendMailMock: unknown

//   beforeEach(async () => {
//     const moduleRef = await Test.createTestingModule({
//       imports: [EnvModule],
//       providers: [NodemailerSendEmailToUser],
//     }).compile()

//     sendEmailService = moduleRef.get(NodemailerSendEmailToUser)

//     // Pegando o mock da função sendMail
//     sendMailMock = (nodemailer.createTransport as any).mock.results[0].value
//       .sendMail
//   })

//   afterEach(() => {
//     vi.restoreAllMocks() // Restaura os mocks após os testes
//   })

//   it('deve enviar um e-mail com sucesso', async () => {
//     await sendEmailService.send({
//       to: {
//         email: 'franzhenry46@gmail.com',
//         subject: 'Teste',
//         body: 'Este é um e-mail de teste',
//       },
//     })

//     waitFor(() => {
//       expect(sendMailMock).toHaveBeenCalledTimes(1)

//       expect(sendMailMock).toHaveBeenCalledWith({
//         from: process.env.SMTP_USER,
//         to: 'franzhenry46@gmail.com',
//         subject: 'Teste',
//         text: 'Este é um e-mail de teste',
//       })
//     })
//   })
// })
