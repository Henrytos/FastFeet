import {
  FormatSendEmailUser,
  SendEmailToUser,
} from '@/domain/notification/application/email/send-email'

export class FakerSendEmailToUser implements SendEmailToUser {
  async send({ to }: FormatSendEmailUser): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 1000 * 2))
    console.log(`Sending email to ${to.email}`)
  }
}
