import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: 'franzhenry46@gmail.com',
    pass: 'cyuk xvrw ziva dqdp',
  },
})

// Função assíncrona correta
async function main() {
  try {
    // Enviar e-mail com o transportador configurado
    const info = await transporter.sendMail({
      from: '"" <franzhenry46@gmail.com>', // Endereço do remetente
      to: 'franzhenry46@gmail.com', // Lista de destinatários
      subject: 'Hello ✔', // Assunto
      text: 'Hello world?', // Corpo do e-mail em texto simples
      html: '<b>Hello world?</b>', // Corpo do e-mail em HTML
    })

    console.log('Message sent: %s', info.messageId)
    // Exibe o ID da mensagem enviada
  } catch (error) {
    console.error('Error sending email:', error)
  }
}

// Executar a função principal
main()
