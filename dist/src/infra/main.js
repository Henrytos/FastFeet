"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const env_service_1 = require("./env/env.service");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const envService = app.get(env_service_1.EnvService);
    const PORT = envService.get('PORT');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('fastfeet')
        .setDescription('Fastfeet API')
        .setVersion('1.0')
        .build();
    const options = {};
    const document = swagger_1.SwaggerModule.createDocument(app, config, options);
    swagger_1.SwaggerModule.setup('api', app, document, {
        jsonDocumentUrl: 'api/json',
    });
    await app.listen(PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map