import {
  FormatSendEmailUser,
  SendEmailToUser,
} from '@/domain/notification/application/email/send-email'
import { Injectable } from '@nestjs/common'
import { sendNotification } from './send-notification'

@Injectable()
export class NodemailerSendEmailToUser implements SendEmailToUser {
  async send({ to }: FormatSendEmailUser) {
    await sendNotification({
      from: '"" <franzhenry46@gmail.com>', // Endereço do remetente
      html: to.body,
      subject: to.subject,
      text: `hello`,
      to: 'franzhenry46@gmail.com', // Lista de destinatários
    })
  }
}
