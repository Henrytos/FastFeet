import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { EnvService } from '../env/env.service'
import { JwtAuthGuard } from './jwt-auth-guard'
import { APP_GUARD } from '@nestjs/core'
import { AuthStrategy } from './jwt.strategy'

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      signOptions: { expiresIn: '60s', algorithm: 'RS256' },
      global: true,
      privateKey: process.env.JWT_PRIVATE_KEY,
      publicKey: process.env.JWT_PUBLIC_KEY,
    }),
  ],
  providers: [
    EnvService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    AuthStrategy,
  ],
})
export class AuthModule {}
