import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import documentBuilder from '@app/config/document-builder';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning();

  app.useGlobalPipes(new ValidationPipe());

  documentBuilder({
    app,
    title: 'Women Futsal Swagger',
    description: 'Women Futsal Backend API Document',
  });

  await app.listen(3000);
}
bootstrap();
