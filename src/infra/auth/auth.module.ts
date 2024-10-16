import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EnvService } from '../env/env.service';
import { JwtAuthGuard } from './jwt-auth-guard';
import { APP_GUARD } from '@nestjs/core';
import { AuthStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      signOptions: { expiresIn: '60s' },
      global: true,
      secret: process.env.JWT_SECRET_KEY,
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
