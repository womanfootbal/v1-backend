import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from '@app/prisma';
import { JwtModule } from '@app/jwt';
import validationSchema from '@env/env-config.schema';

import { AuthenticationModule } from './authentication/authentication.module';
import { UsersModule } from './users/users.module';
import { FreeBoardsModule } from './free-boards/free-boards.module';
import { FreeBoardsCommentsModule } from './free-boards/free-boards-comments/free-boards-comments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`environments/.${process.env.NODE_ENV}.env`],
      isGlobal: true,
      validationSchema,
    }),
    AuthenticationModule,
    PrismaModule,
    UsersModule,
    JwtModule,
    FreeBoardsModule,
    FreeBoardsCommentsModule,
  ],
})
export class AppModule {}
