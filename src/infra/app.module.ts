import { Module } from "@nestjs/common";
import { EnvModule } from "./env/env.module";
import { HttpModule } from "./http/http.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { envSchema } from "./env/env";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => envSchema.parse(env),
    }),
    EnvModule,
    HttpModule,
    AuthModule,
  ],
})
export class AppModule {}
