import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

const ENV = process.env.NODE_ENV;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning();

  const config = new DocumentBuilder()
    .setTitle('Women Futsal Swagger')
    .setDescription('우먼풋살 백엔드 API 문서')
    .addBearerAuth()
    .addCookieAuth('refresh')
    .setVersion('0.0.1')
    .build();
  if (ENV !== 'prod') {
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document, {
      swaggerOptions: {
        tagsSorter: 'alpha',
        operationsSorter: 'conventional',
      },
    });
  }

  await app.listen(3000);
}
bootstrap();
