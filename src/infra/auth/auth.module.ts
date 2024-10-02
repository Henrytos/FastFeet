import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DatabaseModule } from '@/infra/database/database.module';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [DatabaseModule],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
