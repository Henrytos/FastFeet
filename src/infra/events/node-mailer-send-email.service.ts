import { Injectable } from '@nestjs/common'
import * as nodemailer from 'nodemailer'
import * as dotenv from 'dotenv'
import {
  FormatSendEmailUser,
  SendEmailToUser,
} from '@/domain/notification/application/email/send-email'

dotenv.config()

@Injectable()
export class NodemailerSendEmailToUser implements SendEmailToUser {
  private transporter: nodemailer.Transporter

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  }

  /**
   * Implementação do envio de e-mail conforme a classe abstrata
   * @param data - Dados do destinatário e conteúdo do e-mail
   */
  async send(data: FormatSendEmailUser): Promise<void> {
    try {
      console.log('Enviando e-mail para:', data.to.email)
      const info = await this.transporter.sendMail({
        from: process.env.SMTP_USER,
        to: data.to.email,
        subject: data.to.subject,
        text: data.to.body,
      })
      console.log(info)

      console.log('E-mail enviado com sucesso:')
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error)
      throw new Error('Falha ao enviar e-mail')
    }
  }
}
