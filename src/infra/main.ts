import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { EnvService } from './env/env.service'
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const envService = app.get(EnvService)
  const PORT = envService.get('PORT')

  const config = new DocumentBuilder()
    .setTitle('fastfeet')
    .setDescription('Fastfeet API')
    .setVersion('1.0')
    .build()

  const options: SwaggerDocumentOptions = {}

  const document = SwaggerModule.createDocument(app, config, options)
  SwaggerModule.setup('api', app, document, {
    jsonDocumentUrl: 'api/json',
  })

  await app.listen(PORT)
}
bootstrap()
