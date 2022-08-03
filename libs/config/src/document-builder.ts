import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

interface Params {
  app: INestApplication;
  title: string;
  description: string;
}

export default ({ app, title, description }: Params) => {
  const config = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .addBearerAuth()
    .addCookieAuth('refresh')
    .setVersion('0.0.1')
    .build();

  const ENV = process.env.NODE_ENV;
  if (ENV !== 'prod') {
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document, {
      swaggerOptions: {
        tagsSorter: 'alpha',
        operationsSorter: 'conventional',
      },
    });
  }
};
