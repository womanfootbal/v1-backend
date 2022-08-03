import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import documentBuilder from '@app/config/document-builder';

import { AppModule } from './app.module';

const ENV = process.env.NODE_ENV;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning();

  documentBuilder({
    app,
    title: 'Women Futsal Swagger',
    description: 'Women Futsal Backend API Document',
  });

  await app.listen(3000);
}
bootstrap();
