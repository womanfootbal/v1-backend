import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import validationSchema from '@env/env-config.schema';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`environments/.${process.env.NODE_ENV}.env`],
      isGlobal: true,
      validationSchema,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
