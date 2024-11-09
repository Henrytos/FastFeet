import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { EnvService } from './env.service'
import { envSchema } from './env'

@Module({
  providers: [EnvService],
  exports: [EnvService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => envSchema.parse(env),
    }),
  ],
})
export class EnvModule {}
