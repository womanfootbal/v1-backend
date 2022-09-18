import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

import documentBuilder from '@app/config/document-builder';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3001'],
    credentials: true,
    methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
  });
  app.enableVersioning();

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      validationError: {
        value: true,
      },
      forbidUnknownValues: true,
    }),
  );

  documentBuilder({
    app,
    title: 'Women Futsal Swagger',
    description: 'Women Futsal Backend API Document',
  });

  await app.listen(3000);
}
bootstrap();
