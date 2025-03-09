import { Injectable } from '@nestjs/common'
import * as nodemailer from 'nodemailer'
import {
  FormatSendEmailUser,
  SendEmailToUser,
} from '@/domain/notification/application/email/send-email'
import { EnvService } from '../env/env.service'

@Injectable()
export class NodemailerSendEmailToUser implements SendEmailToUser {
  private transporter: nodemailer.Transporter

  constructor(private readonly envService: EnvService) {
    this.transporter = nodemailer.createTransport({
      host: envService.get('SMTP_HOST'),
      port: Number(envService.get('SMTP_PORT')),
      secure: false,
      auth: {
        user: envService.get('SMTP_USER'),
        pass: envService.get('SMTP_PASS'),
      },
    })
  }

  /**
   * Implementação do envio de e-mail conforme a classe abstrata
   * @param data - Dados do destinatário e conteúdo do e-mail
   */
  async send(data: FormatSendEmailUser): Promise<void> {
    try {
      const isShouldTest = this.envService.get('NODE_ENV') === 'test'

      if (isShouldTest) {
        return
      }

      await this.transporter.sendMail({
        from: this.envService.get('SMTP_USER'),
        to: data.to.email,
        subject: data.to.subject,
        text: data.to.body,
      })
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error)
    }
  }
}
