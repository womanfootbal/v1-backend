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
import { FreeBoardsCommentsRepliesModule } from './free-boards/free-boards-comments/free-boards-comments-replies/free-boards-comments-replies.module';
import { ClubNoticesModule } from './club-notices/club-notices.module';

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
    FreeBoardsCommentsRepliesModule,
    ClubsModule,
    ClubApplicationsModule,
    ClubMembersModule,
    ClubNoticesModule,
  ],
})
export class AppModule {}
