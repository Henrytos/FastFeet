import { Module } from '@nestjs/common';
import { EnvModule } from './env/env.module';
import { HttpModule } from './http/http.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [EnvModule, HttpModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
