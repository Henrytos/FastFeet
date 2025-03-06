import { NodemailerSendEmailToUser } from '@/infra/events/node-mailer-send-email.service'

const nodemailerSendEmailToUser = new NodemailerSendEmailToUser()

async function main() {
  nodemailerSendEmailToUser.send({
    to: {
      body: 'Hello World',
      email: 'franzhenry46@gmail.com',
      subject: 'Test',
    },
  })
  return true
}

main()
