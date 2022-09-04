import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

import { PrismaModule } from '@app/prisma';
import { JwtModule } from '@app/jwt';
import validationSchema from '@env/env-config.schema';

import { AuthenticationModule } from './authentication/authentication.module';
import { UsersModule } from './users/users.module';
import { FreeBoardsModule } from './free-boards/free-boards.module';
import { FreeBoardsCommentsModule } from './free-boards/free-boards-comments/free-boards-comments.module';
import { ClubsModule } from './clubs/clubs.module';
import { ClubApplicationsModule } from './clubs/applications/club-applications.module';
import { ClubMembersModule } from './clubs/members/club-members.module';
import { FreeBoardsLikesModule } from './free-boards/free-boards-likes/free-boards-likes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`environments/.${process.env.NODE_ENV}.env`],
      isGlobal: true,
      validationSchema,
    }),
    ThrottlerModule.forRoot({
      ttl: 5,
      limit: 5,
    }),
    AuthenticationModule,
    PrismaModule,
    UsersModule,
    JwtModule,
    FreeBoardsModule,
    FreeBoardsCommentsModule,
    FreeBoardsLikesModule,
    ClubsModule,
    ClubApplicationsModule,
    ClubMembersModule,
  ],
})
export class AppModule {}
