import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvModule } from './env/env.module';

@Module({
  imports: [EnvModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
