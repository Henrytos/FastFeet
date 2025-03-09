import { Module } from '@nestjs/common'
import { EnvModule } from './env/env.module'
import { HttpModule } from './http/http.module'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env/env'
import { EventsModule } from './events/events.module'
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => envSchema.parse(env),
    }),
    AuthModule,
    HttpModule,
    EnvModule,
    EventsModule,
    EmailModule,
  ],
})
export class AppModule {}
