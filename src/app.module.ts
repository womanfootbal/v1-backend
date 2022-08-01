import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from '@app/prisma';
import validationSchema from '@env/env-config.schema';

import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`environments/.${process.env.NODE_ENV}.env`],
      isGlobal: true,
      validationSchema,
    }),
    AuthenticationModule,
    PrismaModule,
  ],
})
export class AppModule {}
