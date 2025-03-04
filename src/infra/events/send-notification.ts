import * as nodemailer from 'nodemailer'

interface SendNotificationParams {
  from: string
  to: string
  subject: string
  text: string
  html: string
}

export async function sendNotification({
  from,
  to,
  subject,
  text,
  html,
}: SendNotificationParams) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
      user: 'franzhenry46@gmail.com', // E-mail remetente
      pass: 'cyuk xvrw ziva dqdp', // Senha do aplicativo ou senha do Gmail
    },
  })

  try {
    // Enviar e-mail com o transportador configurado
    const info = await transporter.sendMail({
      from, // Agora usa o valor de 'from' passado para a função
      to, // Agora usa o valor de 'to' passado para a função
      subject, // Agora usa o valor de 'subject' passado para a função
      text, // Agora usa o valor de 'text' passado para a função
      html, // Agora usa o valor de 'html' passado para a função
    })

    console.log('Message sent: %s', info.messageId) // Exibe o ID da mensagem enviada
    transporter.close() // Fecha a conexão com o servidor SMTP
  } catch (error) {
    console.error('Error sending email:', error)
  }
}
