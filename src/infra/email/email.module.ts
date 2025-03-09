import { Module } from '@nestjs/common'
import { NodemailerSendEmailToUser } from './node-mailer-send-email.service'
import { EnvModule } from '../env/env.module'
import { SendEmailToUser } from '@/domain/notification/application/email/send-email'

@Module({
  imports: [EnvModule],
  providers: [
    {
      provide: SendEmailToUser,
      useClass: NodemailerSendEmailToUser,
    },
  ],
  exports: [SendEmailToUser],
})
export class EmailModule {}
