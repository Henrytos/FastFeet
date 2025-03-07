import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { EnvService } from '../env/env.service'
import { JwtAuthGuard } from './jwt-auth-guard'
import { APP_GUARD } from '@nestjs/core'
import { AuthStrategy } from './jwt.strategy'
import { EnvModule } from '../env/env.module'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [EnvModule],
      inject: [EnvService],
      global: true,
      useFactory: (envService: EnvService) => {
        const publicKEy = envService.get('JWT_PUBLIC_KEY')
        const privateKey = envService.get('JWT_PRIVATE_KEY')

        return {
          signOptions: {
            algorithm: 'RS256',
            expiresIn: 1000 * 60 * 60 * 24 * 7, // 1 week
          },
          publicKey: Buffer.from(publicKEy, 'base64'),
          privateKey: Buffer.from(privateKey, 'base64'),
        }
      },
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
