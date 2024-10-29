



import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { EnvService } from "./env/env.service";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Fastfeet API')
    .setDescription('API para controle de encomendas de uma transportadora fictícia, a FastFeet.')
    .setVersion('1.0')
    .addTag('sessions')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const envService = app.get(EnvService);
  const PORT = envService.get("PORT");
  await app.listen(PORT);
}
bootstrap();
