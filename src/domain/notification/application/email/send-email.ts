export interface FormatSendEmailUser {
  to: {
    email: string
    subject: string
    body: string
  }
}

export abstract class SendEmailToUser {
  abstract send(data: FormatSendEmailUser)
}
