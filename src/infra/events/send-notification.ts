import * as dotenv from 'dotenv'

dotenv.config()

// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

/**
 * Envia um e-mail para um destinatário específico.
 * @param {string} to - Endereço de e-mail do destinatário.
 * @param {string} subject - Assunto do e-mail.
 * @param {string} text - Corpo do e-mail em texto simples.
 * @returns {Promise<boolean>} - Retorna `true` se o e-mail foi enviado com sucesso.
 */
export async function sendEmail(to, subject, text) {
  await transporter
    .sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      text,
    })
    .then((result) => {
      console.log('E-mail enviado com sucesso:', result)
    })
    .catch((err) => {
      console.error('Erro ao enviar e-mail:', err)
    })

  return true
}
